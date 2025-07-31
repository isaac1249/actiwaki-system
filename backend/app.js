const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS 設定
app.use(cors({
  origin: "https://actiwaki-frontend.onrender.com", // 你的前端網址
  credentials: true // 允許攜帶 cookie/token
}));

app.use(express.json());

// 你的其他路由
const authRoutes = require('./auth');
const taskRoutes = require('./tasks');

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/api/protected', (req, res) => {
  res.json({ message: "Protected data" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});