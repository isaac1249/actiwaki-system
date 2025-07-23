const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./todo.db', (err) => {
  if (err) {
    console.error('❌ 資料庫連線失敗:', err);
  } else {
    console.log('✅ 資料庫開啟成功');
  }
});

// 確保 tasks 資料表存在
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      parent INTEGER,
      status TEXT,
      completion INTEGER,
      description TEXT
    )`,
    (err) => {
      if (err) {
        console.error('❌ 建立資料表失敗:', err);
      } else {
        console.log('✅ 資料表 tasks 檢查/建立完成');
      }
    }
  );
});

module.exports = db;