const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// ✅ 加入 login 路由
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, row) => {
    if (err) {
      return res.status(500).json({ error: "資料庫錯誤" });
    }
    if (!row) {
      return res.status(401).json({ error: "帳號或密碼錯誤" });
    }
    res.json({ message: "登入成功", user: row });
  });
});

// ✅ 其他路由 (如 tasks)
router.get('/tasks', (req, res) => {
  db.all("SELECT * FROM tasks", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "取得任務失敗" });
    }
    res.json(rows);
  });
});

module.exports = router;