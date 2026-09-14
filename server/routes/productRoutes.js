// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
} = require('../controllers/productController');

router.get('/', getProducts);                          // public: browse/search/filter
router.get('/:id', getProductById);                     // public: view one product
// protect/adminOnly run first, so an unauthorized request never even gets its file parsed
router.post('/', protect, adminOnly, upload.single('image'), createProduct);
router.put('/:id', protect, adminOnly, upload.single('image'), updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);// admin only
router.post('/:id/reviews', protect, addReview);         // any logged-in user

module.exports = router;
