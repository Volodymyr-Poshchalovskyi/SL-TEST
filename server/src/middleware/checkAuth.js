const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // * 1. Extract Token from Authorization Header
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    // * Check if token is present
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }

    // * 2. Verify and Decode the Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // * 3. Attach User ID to the Request Object
    req.userId = decoded.id;
    
    // * Proceed to the next middleware or controller
    next();
  } catch (e) {
    // * Handle invalid or expired token errors
    return res.status(403).json({ message: 'Invalid token' });
  }
};