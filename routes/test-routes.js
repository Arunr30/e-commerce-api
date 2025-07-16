const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/protected', protect, (req, res) => {
  res.json({ message: `Hello ${req.user.name}, you are authenticated!` });
});

router.get('/admin-only', protect, admin, (req, res) => {
  res.json({ message: `Hello Admin ${req.user.name}` });
});

module.exports = router;
