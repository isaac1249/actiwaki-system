const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 中介層
app.use(express.json());

// ✅ 正確 CORS 設定
app.use(cors({
  origin: "https://actiwaki-frontend.onrender.com", // 前端 render 網址
  credentials: true
}));

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