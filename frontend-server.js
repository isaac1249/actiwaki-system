// frontend-server.js
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'frontend/dist')));

// 所有路由導回 index.html（給 React Router 用）
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

app.listen(port, () => {
  console.log(`前端伺服器運行於 http://localhost:${port}`);
});