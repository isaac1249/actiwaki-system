// app.js
try {
  require('dotenv').config(); // 本地環境載入 .env
} catch (err) {
  console.log("dotenv not found, using Render environment variables");
}

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 10000;

// PostgreSQL 連線池
const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT || 5432,
  ssl: { rejectUnauthorized: false }, // Render 上必須
});

// 確認資料庫連線
pool.connect()
  .then(client => {
    console.log("✅ Connected to PostgreSQL");
    client.release();
  })
  .catch(err => console.error("❌ Database connection error", err.stack));

// 中介層
app.use(cors({
  origin: '*', // 如果你只想允許前端，改成 'https://actiwaki-frontend.onrender.com'
  credentials: true
}));
app.use(bodyParser.json());

// 將 pool 傳入 routes
app.use('/api', routes(pool));

app.get('/', (req, res) => {
  res.send("Backend is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});