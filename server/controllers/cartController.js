// controllers/cartController.js - each user has exactly one cart

const Cart = require('../models/Cart');
const Product = require('../models/Product');

// helper: get (or create) the logged-in user's cart, with product details populated
async function getOrCreateCart(userId) {
  let cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  return cart;
}

// helper: shape the response the frontend needs - items + a total price
function formatCart(cart) {
  const items = cart.items.filter((i) => i.product); // drop items whose product was deleted
  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  return { _id: cart._id, items, total };
}

// GET /api/cart
async function getCart(req, res, next) {
  try {
    const cart = await getOrCreateCart(req.user._id);
    res.json(formatCart(cart));
  } catch (err) {
    next(err);
  }
}

// POST /api/cart  body: { productId, quantity }
async function addToCart(req, res, next) {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = new Cart({ user: req.user._id, items: [] });

    const existing = cart.items.find((i) => i.product.toString() === productId);
    if (existing) {
      existing.quantity += Number(quantity); // already in cart, just bump quantity
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    const populated = await cart.populate('items.product');
    res.json(formatCart(populated));
  } catch (err) {
    next(err);
  }
}

// PUT /api/cart/:productId  body: { quantity }
async function updateCartItem(req, res, next) {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find((i) => i.product.toString() === req.params.productId);
    if (!item) return res.status(404).json({ message: 'Item not in cart' });

    item.quantity = Number(quantity);
    await cart.save();
    const populated = await cart.populate('items.product');
    res.json(formatCart(populated));
  } catch (err) {
    next(err);
  }
}

// DELETE /api/cart/:productId
async function removeFromCart(req, res, next) {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter((i) => i.product.toString() !== req.params.productId);
    await cart.save();
    const populated = await cart.populate('items.product');
    res.json(formatCart(populated));
  } catch (err) {
    next(err);
  }
}

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, getOrCreateCart };
