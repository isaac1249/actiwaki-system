// auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

module.exports = (pool) => {
  const router = express.Router();

  // 登入
  router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
      const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      const user = result.rows[0];

      if (!user) {
        return res.status(401).json({ error: '帳號或密碼錯誤' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: '帳號或密碼錯誤' });
      }

      const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
      return res.json({ token });
    } catch (err) {
      console.error('登入失敗:', err);
      return res.status(500).json({ error: '伺服器錯誤' });
    }
  });

  // 註冊
  router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await pool.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
        [username, hashedPassword]
      );
      return res.json({ id: result.rows[0].id, username: result.rows[0].username });
    } catch (err) {
      console.error('註冊失敗:', err);
      return res.status(500).json({ error: '伺服器錯誤' });
    }
  });

  return router;
};