import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AddPage from "./pages/AddPage";
import TreePage from "./pages/TreePage";
import QuotePage from "./pages/QuotePage";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";

function App() {
  const [authenticated, setAuthenticated] = useState(null); // null 表示還沒檢查完成

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthenticated(!!token); // 有 token → true，否則 false
  }, []);

  if (authenticated === null) {
    return <div style={{ color: "white" }}>載入中...</div>; // 避免閃爍白頁
  }

  if (!authenticated) {
    return (
      <Routes>
        <Route path="/" element={<LoginPage onLogin={() => setAuthenticated(true)} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/add" element={<AddPage />} />
        <Route path="/tree" element={<TreePage />} />
        <Route path="/quote" element={<QuotePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/add" />} />
    </Routes>
  );
}

export default App;