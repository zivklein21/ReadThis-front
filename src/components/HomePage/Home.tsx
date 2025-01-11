// Packages
import React from "react";

// Components
import NavBar from "../NavBar/NavBar";

// CSS
import styles from "./Home.module.css";

// Images

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <NavBar />

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
