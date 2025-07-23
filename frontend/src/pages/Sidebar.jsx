import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>功能選單</h3>
      <ul>
        <li><a href="#">客戶查詢</a></li>
        <li><a href="#">報價系統</a></li>
        <li><a href="#">歷史報價查詢</a></li>
        <li><a href="#">系統設定</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;