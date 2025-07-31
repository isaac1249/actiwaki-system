const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ CORS 設定（允許 OPTIONS 預檢請求）
app.use(cors({
  origin: "https://actiwaki-frontend.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// ✅ 讓 Express 處理預檢請求
app.options("*", cors({
  origin: "https://actiwaki-frontend.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());

// Debug log
console.log("CORS 設定完成，允許來源: https://actiwaki-frontend.onrender.com");

// Routes
const authRoutes = require("./auth");
const tasksRoutes = require("./tasks");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", tasksRoutes);

// 健康檢查
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// 啟動伺服器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`後端已啟動在 Port ${PORT}`);
});