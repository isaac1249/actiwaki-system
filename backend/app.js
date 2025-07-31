// app.js
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();

// PostgreSQL Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Render 需要
});

// ✅ CORS 設定
app.use(cors({
  origin: "https://actiwaki-frontend.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));
app.options("*", cors());

app.use(express.json());

// Routes（要傳入 pool）
const routes = require("./routes")(pool);
app.use("/api", routes);

// 健康檢查
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// 啟動伺服器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`後端已啟動在 Port ${PORT}`);
});