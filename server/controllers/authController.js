// controllers/authController.js - register & login

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// helper: creates a signed JWT containing the user's id
function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

// POST /api/auth/register
async function registerUser(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token: signToken(user._id),
    });
  } catch (err) {
    next(err); // hand off to errorMiddleware
  }
}

// POST /api/auth/login
async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid email or password' });

    res.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token: signToken(user._id),
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { registerUser, loginUser };
