// models/Product.js - the core item ZENTRO sells
// reviews are stored right on the product (simpler than a separate collection)

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,             // reviewer's name, saved at time of review
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String, default: '' },
    image: { type: String, default: '' }, // one image URL keeps things simple
    stock: { type: Number, default: 0 },
    tags: [String],
    specifications: { type: mongoose.Schema.Types.Mixed, default: {} }, // free-form object e.g. { ram: '16GB' }
    reviews: [reviewSchema],
    rating: { type: Number, default: 0 },     // average of reviews
    numReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
