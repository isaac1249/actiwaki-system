require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 10000;

// PostgreSQL Pool 設定
const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  ssl: { rejectUnauthorized: false } // Render 必須加上 SSL
});

// 確保連線正常
pool.connect()
  .then(() => console.log('✅ 已成功連接到 PostgreSQL'))
  .catch(err => console.error('❌ PostgreSQL 連接失敗:', err));

// 中介層
app.use(cors({
  origin: 'https://actiwaki-frontend.onrender.com',
  credentials: true
}));
app.use(bodyParser.json());

// 將 PostgreSQL pool 傳到 routes
app.use((req, res, next) => {
  req.db = pool;
  next();
});

// 路由
app.use('/api', routes);

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});