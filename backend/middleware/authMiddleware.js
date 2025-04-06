const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, 'anySuperSecretKey123');  // same key as in login

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Invalid user' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = authMiddleware;
