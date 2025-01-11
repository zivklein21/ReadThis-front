// Packages
import React from "react";

// CSS
import styles from "./NavBar.module.css";

// Images
import logo from "../../assets/readThis_purple.svg";
import { FaUser } from "react-icons/fa";

const NavBar: React.FC = () => {
  const isAuthenticated = false;

  const profileClick = () => {
    if (!isAuthenticated) {
      window.location.href = "/signin";
    }
  };

  const homeClick = () => {
    window.location.href = "/";
  };

  return (
    <nav className={styles.navbar}>
      <img src={logo} alt="Logo" className={styles.logo} onClick={homeClick}/>
      <h1 className={styles.title}>ReadThis</h1>
      <FaUser className={styles.userIcon} onClick={profileClick} />
    </nav>
  );
};

export default NavBar;
