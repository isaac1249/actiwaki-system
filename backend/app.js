// app.js
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();

// ✅ PostgreSQL Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// ✅ CORS 設定（允許 OPTIONS 預檢請求）
app.use(cors({
  origin: "https://actiwaki-frontend.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// ✅ 處理預檢請求
app.options("*", cors({
  origin: "https://actiwaki-frontend.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// ✅ 解析 JSON
app.use(express.json());

// Debug log
console.log("✅ CORS 設定完成，允許來源: https://actiwaki-frontend.onrender.com");

// ✅ 掛載 routes，並把 pool 傳進去
const routes = require("./routes");
app.use("/api", routes(pool));

// 健康檢查
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// ✅ 啟動伺服器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 後端已啟動在 Port ${PORT}`);
});