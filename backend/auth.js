const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// 登入
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await req.db.query('SELECT * FROM users WHERE username=$1', [username]);
    const user = result.rows[0];

    if (!user) return res.status(401).json({ error: '帳號或密碼錯誤' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: '帳號或密碼錯誤' });

    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });

  } catch (err) {
    console.error('登入失敗:', err);
    res.status(500).json({ error: '登入失敗' });
  }
});

// 測試保護路由
router.get('/protected', (req, res) => {
  res.json({ message: '已登入，可以訪問保護資料' });
});

module.exports = router;