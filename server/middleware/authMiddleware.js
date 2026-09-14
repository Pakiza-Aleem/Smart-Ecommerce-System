// middleware/authMiddleware.js - checks who's logged in, and who's an admin

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// protect: blocks the request unless a valid JWT is sent
async function protect(req, res, next) {
  try {
    const header = req.headers.authorization; // expected format: "Bearer <token>"
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // throws if invalid/expired

    const user = await User.findById(decoded.id).select('-password'); // never send the hash back
    if (!user) return res.status(401).json({ message: 'User no longer exists' });

    req.user = user; // now every controller after this can read req.user
    next();
  } catch (err) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
}

// adminOnly: use AFTER protect - assumes req.user is already set
function adminOnly(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  res.status(403).json({ message: 'Admin access only' });
}

module.exports = { protect, adminOnly };
