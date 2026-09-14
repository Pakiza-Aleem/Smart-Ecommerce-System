require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
  })
);

app.use(express.json());

connectDB();

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/wishlist', require('./routes/wishlistRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'ZENTRO API is running',
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`ZENTRO server running on port ${PORT}`);
});
