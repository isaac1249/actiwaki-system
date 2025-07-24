// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import AddPage from './pages/AddPage';
import TreePage from './pages/TreePage';
import QuotePage from './pages/QuotePage';
import LoginPage from './pages/LoginPage';
import Layout from './pages/Layout';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // 防止閃爍

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("/api/protected", { withCredentials: true });
        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return null; // 避免驗證未完成時渲染畫面
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
      <Route element={<Layout onLogout={() => setAuthenticated(false)} />}>
        <Route path="/add" element={<AddPage />} />
        <Route path="/tree" element={<TreePage />} />
        <Route path="/quote" element={<QuotePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/add" />} />
    </Routes>
  );

}

export default App;