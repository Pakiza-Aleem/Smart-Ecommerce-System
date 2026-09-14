// routes/aiRoutes.js
// Architecture: React -> Express (here) -> AI API -> Express -> React
// The AI_API_KEY only ever lives on the server, never in the frontend.
const express = require('express');
const router = express.Router();
const { smartShopping, compareProducts, productQuestion, getRecommendations } = require('../controllers/aiController');

router.post('/shopping', smartShopping);
router.post('/compare', compareProducts);
router.post('/product-question', productQuestion);
router.post('/recommendations', getRecommendations);

module.exports = router;
