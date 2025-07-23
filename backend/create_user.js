// create_user.js
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const db = new sqlite3.Database('./database.db');

const username = 'isaac1249';
const password = 'aA80123145';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error("密碼加密失敗:", err);
    return;
  }

  db.run(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hash],
    (err) => {
      if (err) {
        console.error("帳號建立失敗:", err.message);
      } else {
        console.log(`使用者 ${username} 建立成功`);
      }
      db.close();
    }
  );
});