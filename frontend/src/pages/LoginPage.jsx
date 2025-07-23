import React, { useState } from 'react';
import axios from "axios";

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/login", { username, password }, { withCredentials: true });
      onLogin();  // 登入成功後回首頁或轉跳
    } catch (err) {
      alert("登入失敗");
    }
  };

  return (
    <div className="login-container">
      <h2>登入</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="帳號" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="密碼" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">登入</button>
      </form>
    </div>
  );
}