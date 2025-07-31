import React, { useState } from "react";
import axios from "axios";

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://actiwaki-system.onrender.com/api/auth/login",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // 🔑 確保 cookie/token 傳遞
        }
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        alert("登入成功！");
        onLogin();
      } else {
        alert("登入失敗，沒有收到 token");
      }
    } catch (err) {
      console.error("登入錯誤:", err);
      alert("登入失敗，請檢查帳號密碼或伺服器");
    }
  };

  return (
    <div className="login-container" style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>登入</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="帳號"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="密碼"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">登入</button>
      </form>
    </div>
  );
}