// routes.js
const express = require('express');
const tasks = require('./tasks');
const auth = require('./auth');

const router = express.Router();

// 如果你有需要測試的保護路由，可以這樣寫：
router.get('/protected', (req, res) => {
  res.json({ message: 'Protected data' });
});

router.use('/tasks', tasks);   // 任務 API
router.use('/auth', auth);     // 登入驗證 API

module.exports = router;