const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //Get Token from header
  const token = req.header('x-admin-auth-token');
  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, Authorization denied' });
  }
  //verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtsecret'));
    req.admin = decoded.admin;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
