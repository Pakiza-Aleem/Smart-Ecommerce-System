// controllers/productController.js - CRUD + search/filter/sort + reviews

const Product = require('../models/Product');
const { uploadBufferToCloudinary } = require('../utils/uploadToCloudinary');

// Builds the fields to save for create/update. If an uploaded file is present
// (req.file, from Multer), it's uploaded to Cloudinary and its hosted URL wins.
// Otherwise, whatever plain string was sent in req.body.image is used as-is -
// this is what keeps existing/external image URLs working unchanged.
async function resolveProductPayload(req) {
  const payload = { ...req.body };

  if (payload.price !== undefined) payload.price = Number(payload.price);
  if (payload.stock !== undefined) payload.stock = Number(payload.stock);
  if (payload.tags && typeof payload.tags === 'string') {
    payload.tags = payload.tags.split(',').map((t) => t.trim()).filter(Boolean);
  }
  if (payload.specifications && typeof payload.specifications === 'string') {
    try {
      payload.specifications = JSON.parse(payload.specifications);
    } catch {
      delete payload.specifications; // ignore malformed JSON rather than crash the request
    }
  }

  if (req.file) {
    const uploaded = await uploadBufferToCloudinary(req.file.buffer);
    payload.image = uploaded.secure_url;
  } else if (payload.image === '') {
    // an empty string means "no change" on update, and "no image yet" on create -
    // either way, don't let it overwrite an existing image field with blank.
    delete payload.image;
  }

  return payload;
}

// GET /api/products?search=laptop&category=Laptops&minPrice=&maxPrice=&sort=price
async function getProducts(req, res, next) {
  try {
    const { search, category, minPrice, maxPrice, sort } = req.query;
    const filter = {};

    if (search) filter.name = { $regex: search, $options: 'i' }; // case-insensitive partial match
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let query = Product.find(filter);

    if (sort === 'price') query = query.sort({ price: 1 });
    else if (sort === '-price') query = query.sort({ price: -1 });
    else if (sort === 'rating') query = query.sort({ rating: -1 });
    else query = query.sort({ createdAt: -1 }); // newest first by default

    const products = await query;
    res.json(products);
  } catch (err) {
    next(err);
  }
}

// GET /api/products/:id
async function getProductById(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
}

// POST /api/products (admin only)
// Accepts either multipart/form-data with an "image" file (uploaded to
// Cloudinary), or a JSON/plain body with an "image" URL string.
async function createProduct(req, res, next) {
  try {
    const payload = await resolveProductPayload(req);
    const product = await Product.create(payload);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

// PUT /api/products/:id (admin only)
async function updateProduct(req, res, next) {
  try {
    const payload = await resolveProductPayload(req);
    const product = await Product.findByIdAndUpdate(req.params.id, payload, {
      new: true, // return the updated document, not the old one
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/products/:id (admin only)
async function deleteProduct(req, res, next) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
}

// POST /api/products/:id/reviews (any logged-in user)
async function addReview(req, res, next) {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.reviews.push({ user: req.user._id, name: req.user.name, rating, comment });
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length;

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
};
