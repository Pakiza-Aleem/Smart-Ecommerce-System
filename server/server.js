// server.js - starts the whole backend

require('dotenv').config();          // load variables from .env
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

// --- middleware ---
app.use(cors({ origin: process.env.CLIENT_URL || '*' })); // allow the frontend to call this API
app.use(express.json());            // parse JSON request bodies into req.body

// --- connect to the database first ---
connectDB();

// --- routes ---
// each route file only defines URLs + which controller handles them
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/wishlist', require('./routes/wishlistRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

// simple health check, useful when you deploy
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// --- error handler must be LAST, after all routes ---
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
