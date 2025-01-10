import React from "react";
import styles from "./NavBar.module.css";
import logo from "../../assets/readThis_purple.svg";
import { FaUser } from "react-icons/fa";

const NavBar: React.FC = () => {
  const isAuthenticated = false;

  const handleIconClick = () => {
    if (!isAuthenticated) {
      window.location.href = "/signin";
    }
  };

  return (
    <nav className={styles.navbar}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <h1 className={styles.title}>ReadThis</h1>
      <FaUser className={styles.userIcon} onClick={handleIconClick} />
    </nav>
  );
};

export default NavBar;
