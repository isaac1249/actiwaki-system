const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 3000;

// ✅ CORS 正確設置（注意 credentials: true 一定要搭配 origin 明確設定）
app.use(
  cors({
    origin: "https://actiwaki-frontend.onrender.com",
    credentials: true,
  })
);

// 基本中介層設定
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api", routes);

// 預設首頁提示
app.get("/", (req, res) => {
  res.send("Backend API Server 正常運作");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});