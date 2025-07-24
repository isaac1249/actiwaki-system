// src/pages/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar'; // 若你已有 sidebar

const Layout = () => {
  return (
    <div>
    <Navbar onLogout={onLogout} />
      <Outlet />
        <div style={{ display: 'flex', height: '100vh' }}>
          <Sidebar /> {/* 左側欄 */}
          <div style={{ flex: 1 }}>
            <Navbar /> {/* 上方欄 */}
            <div style={{ padding: '1rem' }}>
              <Outlet /> {/* 頁面內容 */}
            </div>
          </div>
        </div>
    </div>
  );
};

export default Layout;