import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import AddPage from './pages/AddPage';
import TreePage from './pages/TreePage';
import Navbar from './pages/Navbar';
import Layout from './pages/Layout';
import LoginPage from './pages/LoginPage';
import QuotePage from './pages/QuotePage'; // 👈 報價頁面

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/api/protected", { withCredentials: true })
      .then(() => setAuthenticated(true))
      .catch(() => setAuthenticated(false));
  }, []);

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