// routes/auth.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

// 使用 database.db 查詢帳號密碼
const db = new sqlite3.Database('./database.db');

// 登入 API：POST /api/auth/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: '請提供帳號與密碼' });
  }

  db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, row) => {
    if (err) {
      return res.status(500).json({ error: '資料庫錯誤' });
    }

    if (!row) {
      return res.status(401).json({ error: '帳號或密碼錯誤' });
    }

    res.json({ message: '登入成功', user: row });
  });
});

module.exports = router;