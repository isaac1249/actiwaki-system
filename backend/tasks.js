const express = require("express");
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./todo.db');

// 取得所有任務
router.get("/", (req, res) => {
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 新增任務
router.post("/", (req, res) => {
  const { name, parent, status, completion, description, priority } = req.body;
  db.run(
    "INSERT INTO tasks (name, parent, status, completion, description, priority) VALUES (?, ?, ?, ?, ?, ?)",
    [name, parent, status, completion, description, priority],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// 更新任務
router.put("/:id", (req, res) => {
  const { name, parent, status, completion, description, priority } = req.body;
  db.run(
    `UPDATE tasks SET 
      name = ?, 
      parent = ?, 
      status = ?, 
      completion = ?, 
      description = ?,
      priority = ?
     WHERE id = ?`,
    [name, parent, status, completion, description, priority, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ changes: this.changes });
    }
  );
});

// 儲存節點位置
router.put('/tasks/:id/position', (req, res) => {
  const { id } = req.params;
  const { x, y } = req.body;

  const sql = 'UPDATE tasks SET x = ?, y = ? WHERE id = ?';
  db.run(sql, [x, y, id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: '更新位置失敗' });
    }
    res.json({ success: true });
  });
});

module.exports = router;