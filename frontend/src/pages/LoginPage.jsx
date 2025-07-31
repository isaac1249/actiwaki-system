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
        { username, password }
      );
      // 儲存 token
      localStorage.setItem("token", res.data.token);
      // 通知 App.jsx 已登入
      onLogin();
    } catch (err) {
      console.error("登入失敗:", err);
      alert("登入失敗，請確認帳號密碼");
    }
  };

  return (
    <div className="login-container">
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