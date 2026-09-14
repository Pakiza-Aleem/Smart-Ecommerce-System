// models/User.js - a shopper or an admin

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true }, // this is the HASHED password, never plain text
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  },
  { timestamps: true } // adds createdAt / updatedAt automatically
);

module.exports = mongoose.model('User', userSchema);
