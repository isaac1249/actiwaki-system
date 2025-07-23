const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

const db = new sqlite3.Database('./database.db');

const SECRET_KEY = 'your_secret_key';

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  console.log('收到登入請求', username, password); // DEBUG

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) {
      console.error('資料庫錯誤:', err); // DEBUG
      return res.status(500).json({ error: '內部伺服器錯誤' });
    }

    if (!user) {
      console.warn('找不到使用者'); // DEBUG
      return res.status(401).json({ error: '帳號或密碼錯誤' });
    }

    // 比對密碼
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('密碼比對錯誤:', err); // DEBUG
        return res.status(500).json({ error: '密碼驗證錯誤' });
      }

      if (!isMatch) {
        console.warn('密碼錯誤'); // DEBUG
        return res.status(401).json({ error: '帳號或密碼錯誤' });
      }

      // 密碼正確，簽發 JWT
      const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    });

  });
  console.log('Login attempt:', { username, password, user });
});

module.exports = router;