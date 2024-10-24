const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];  // Expecting "Bearer token"
    if (!token) {
      return res.status(401).json({ message: 'Auth failed: Token missing' });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { userId: decodedToken.userId };  // Attach userId to req object
    next();  // Move to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Auth failed: Invalid token' });
  }
};

module.exports = authMiddleware;
