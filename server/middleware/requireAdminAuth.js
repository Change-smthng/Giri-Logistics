const jwt = require('jsonwebtoken');

module.exports = function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  const jwtSecret = process.env.JWT_SECRET;

  if (!token || !jwtSecret) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }

  try {
    const payload = jwt.verify(token, jwtSecret);
    req.admin = payload;
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};
