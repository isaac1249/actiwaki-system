// tasks.js
const express = require('express');

module.exports = (pool) => {
  const router = express.Router();

  // 取得所有任務
  router.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
      res.json(result.rows);
    } catch (err) {
      console.error('取得任務失敗:', err);
      res.status(500).json({ error: '取得任務失敗' });
    }
  });

  // 新增任務
  router.post('/', async (req, res) => {
    const { name, parent, status, completion, description, priority, x, y } = req.body;
    try {
      const result = await pool.query(
        `INSERT INTO tasks (name, parent, status, completion, description, priority, x, y) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [name, parent, status, completion, description, priority, x, y]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error('新增任務失敗:', err);
      res.status(500).json({ error: '新增任務失敗' });
    }
  });

  // 更新任務
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, parent, status, completion, description, priority, x, y } = req.body;
    try {
      const result = await pool.query(
        `UPDATE tasks 
         SET name=$1, parent=$2, status=$3, completion=$4, description=$5, priority=$6, x=$7, y=$8
         WHERE id=$9 RETURNING *`,
        [name, parent, status, completion, description, priority, x, y, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: '任務不存在' });
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error('更新任務失敗:', err);
      res.status(500).json({ error: '更新任務失敗' });
    }
  });

  return router;
};