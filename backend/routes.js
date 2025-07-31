// routes.js
const express = require('express');
const tasks = require('./tasks');
const auth = require('./auth');

module.exports = (pool) => {
  const router = express.Router();

  // 測試保護路由
  router.get('/protected', (req, res) => {
    res.json({ message: 'Protected data' });
  });

  // 確保掛載路由時傳入 pool
  router.use('/tasks', tasks(pool));
  router.use('/auth', auth(pool));

  return router;
};