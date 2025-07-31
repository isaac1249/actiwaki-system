// auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

module.exports = (pool) => {
  const router = express.Router();

  // 登入
  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const result = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
      const user = result.rows[0];

      if (!user) return res.status(401).json({ error: '帳號或密碼錯誤' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: '帳號或密碼錯誤' });

      const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      console.error('登入錯誤:', err);
      res.status(500).json({ error: '伺服器錯誤' });
    }
  });

  return router;
};