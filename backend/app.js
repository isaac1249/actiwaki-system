// app.js
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // ❗請寫死前端位址
  credentials: true               // ❗允許攜帶 cookie / token
}));
app.use(express.json());

// 保留原本的 /api/tasks 路徑
app.use('/api', routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`伺服器運行在 http://localhost:${PORT}`);
});