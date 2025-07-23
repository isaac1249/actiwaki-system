// frontend/src/pages/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
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
      </ul>
    </nav>
  );
};

export default Navbar;
