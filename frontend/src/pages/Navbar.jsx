// frontend/src/pages/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import axios from "axios";

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout", {}, { withCredentials: true });
      localStorage.removeItem("token");
      onLogout(); // 更新 App 狀態
      navigate("/"); // 導回登入頁
    } catch (error) {
      console.error("登出失敗", error);
    }
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.title}>業務系統</div>
      <ul className={styles.menu}>
        <li className={styles.item}>
          <Link to="/add" className={styles.link}>代辦任務</Link>
        </li>
        <li className={styles.item}>
          <Link to="/tree" className={styles.link}>任務樹狀圖</Link>
        </li>
        <li className={styles.item}>
          <Link to="/quote" className={styles.link}>報價系統</Link>
        </li>
        <li className={styles.item}>
          <button onClick={handleLogout} className={styles.logoutBtn}>登出</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;