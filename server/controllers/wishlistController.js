// controllers/wishlistController.js - each user has exactly one wishlist

const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

async function getOrCreateWishlist(userId) {
  let wishlist = await Wishlist.findOne({ user: userId }).populate('products');
  if (!wishlist) wishlist = await Wishlist.create({ user: userId, products: [] });
  return wishlist;
}

function formatWishlist(wishlist) {
  const products = wishlist.products.filter(Boolean); // drop any deleted products
  return { _id: wishlist._id, products };
}

// GET /api/wishlist
async function getWishlist(req, res, next) {
  try {
    const wishlist = await getOrCreateWishlist(req.user._id);
    res.json(formatWishlist(wishlist));
  } catch (err) {
    next(err);
  }
}

// POST /api/wishlist  body: { productId }
async function addToWishlist(req, res, next) {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) wishlist = new Wishlist({ user: req.user._id, products: [] });

    const already = wishlist.products.some((p) => p.toString() === productId);
    if (!already) wishlist.products.push(productId);

    await wishlist.save();
    const populated = await wishlist.populate('products');
    res.json(formatWishlist(populated));
  } catch (err) {
    next(err);
  }
}

// DELETE /api/wishlist/:productId
async function removeFromWishlist(req, res, next) {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });

    wishlist.products = wishlist.products.filter((p) => p.toString() !== req.params.productId);
    await wishlist.save();
    const populated = await wishlist.populate('products');
    res.json(formatWishlist(populated));
  } catch (err) {
    next(err);
  }
}

module.exports = { getWishlist, addToWishlist, removeFromWishlist, getOrCreateWishlist };
