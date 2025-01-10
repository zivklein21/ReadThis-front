import React from "react";
import styles from "./Home.module.css";
import logo from "../../assets/readThis_purple.svg";
import { FaUser } from "react-icons/fa";

const Home: React.FC = () => {
  const isAuthenticated = false; // check if user is connected

  const handleIconClick = () => {
    if (!isAuthenticated) {
      window.location.href = "/signin";
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <h1 className={styles.title}>ReadThis</h1>
        <FaUser className={styles.userIcon} onClick={handleIconClick} />
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        <h2 className={styles.sectionTitle}>Welcome to Book Network</h2>
        <p className={styles.description}>
          Explore the latest posts and connect with fellow book lovers!
        </p>
      </main>
    </div>
  );
};

export default Home;
