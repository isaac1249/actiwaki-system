// auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./db');

const router = express.Router();
const SECRET_KEY = 'your-secret-key';

// 登入 API
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);

  if (!user) return res.status(401).json({ message: '帳號不存在' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: '密碼錯誤' });

  const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;