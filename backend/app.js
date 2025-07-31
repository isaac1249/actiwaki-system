const express = require("express");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken"); // 👈 加這個

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

// ✅ 加入 /api/protected (驗證登入狀態)
app.get("/api/protected", (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "缺少授權標頭" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "缺少 Token" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "your_secret_key", (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "無效或過期的 Token" });
    }
    res.json({ message: "驗證成功", user: decoded });
  });
});

// 健康檢查
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// 啟動伺服器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`後端已啟動在 Port ${PORT}`);
});