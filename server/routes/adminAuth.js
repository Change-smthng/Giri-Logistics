const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const jwtSecret = process.env.JWT_SECRET;

  if (!adminUsername || !adminPassword || !jwtSecret) {
    return res.status(500).json({ error: 'Admin auth is not configured on server.' });
  }

  if (username !== adminUsername || password !== adminPassword) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  const token = jwt.sign({ role: 'admin', username }, jwtSecret, { expiresIn: '12h' });

  return res.json({ success: true, token });
});

router.get('/verify', (req, res) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  const jwtSecret = process.env.JWT_SECRET;

  if (!token || !jwtSecret) {
    return res.status(401).json({ valid: false });
  }

  try {
    jwt.verify(token, jwtSecret);
    return res.json({ valid: true });
  } catch {
    return res.status(401).json({ valid: false });
  }
});

module.exports = router;