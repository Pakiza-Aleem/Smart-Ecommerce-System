// config/db.js - connects to MongoDB using Mongoose

require('dotenv').config(); // Load environment variables from .env
const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // reads the connection string from .env
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // stop the server if the DB is unreachable
  }
}

module.exports = connectDB;
