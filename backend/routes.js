// routes.js
const express = require('express');
const tasks = require('./tasks');
const auth = require('./auth');

module.exports = (pool) => {
  const router = express.Router();
  // 如果你有需要測試的保護路由，可以這樣寫：
  router.get('/protected', (req, res) => {
    res.json({ message: 'Protected data' });
  });

  router.use('/tasks', tasks(pool));   // 任務 API
  router.use('/auth', auth(pool));     // 登入驗證 API

  return router;
};