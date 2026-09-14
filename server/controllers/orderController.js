// controllers/orderController.js - checkout + order history
// flow: Cart -> validate stock -> create Order -> reduce stock -> empty Cart

const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Product = require('../models/Product');

// POST /api/orders  body: { shippingAddress }
async function createOrder(req, res, next) {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // 1. make sure every item still has enough stock
    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for ${item.product.name}` });
      }
    }

    // 2. snapshot name/price so the order stays accurate even if the product changes later
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    }));
    const totalPrice = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress: req.body.shippingAddress,
      totalPrice,
    });

    // 3. reduce stock for each product bought
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, { $inc: { stock: -item.quantity } });
    }

    // 4. empty the cart now that checkout is done
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
}

// GET /api/orders - the logged-in user's own orders (admins can pass ?all=true for everyone's)
async function getOrders(req, res, next) {
  try {
    const filter = req.query.all === 'true' && req.user.role === 'admin' ? {} : { user: req.user._id };
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
}

// GET /api/orders/:id
async function getOrderById(req, res, next) {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const isOwner = order.user.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not your order' });
    }

    res.json(order);
  } catch (err) {
    next(err);
  }
}

// PUT /api/orders/:id/status  body: { status }  (admin only)
async function updateOrderStatus(req, res, next) {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
}

module.exports = { createOrder, getOrders, getOrderById, updateOrderStatus };
