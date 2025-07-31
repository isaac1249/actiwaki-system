// backend/app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

// ✅ 設定 CORS，只允許前端的 Render 網址
app.use(cors({
  origin: "https://actiwaki-frontend.onrender.com", // 改成你的前端網址
  credentials: true
}));

app.use(bodyParser.json());
app.use(express.json());

// 引入路由
const authRoutes = require('./auth');
const taskRoutes = require('./tasks');

// 路由設定
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// 測試 API
app.get('/api/protected', (req, res) => {
  res.json({ message: "成功存取受保護的 API" });
});

// 啟動伺服器
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});