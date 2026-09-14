// models/Order.js - a snapshot of what was bought, at what price, when

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        name: String,      // saved so the order still makes sense if the product changes later
        price: Number,
        quantity: Number,
      },
    ],
    shippingAddress: {
      fullName: String,
      address: String,
      city: String,
      phone: String,
    },
    paymentMethod: { type: String, default: 'Cash on Delivery' },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
