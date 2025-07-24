import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');  // 清除 token
    navigate('/login');                // 導回登入頁
  };

  return (
    <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
      登出
    </button>
  );
};

export default LogoutButton;