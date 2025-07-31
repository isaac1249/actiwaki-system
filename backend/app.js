const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());

// ✅ 正確設定 cors
app.use(cors({
  origin: "https://actiwaki-frontend.onrender.com", // 允許前端網址
  credentials: true, // 允許帶 cookie / token
}));

app.options("*", cors()); // 處理預檢請求

// 測試路由
app.get("/", (req, res) => {
  res.json({ message: "後端啟動成功！" });
});

// 引入其他 API
const authRoutes = require("./auth");
const tasksRoutes = require("./tasks");
app.use("/api/auth", authRoutes);
app.use("/api/tasks", tasksRoutes);

// 啟動伺服器
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));