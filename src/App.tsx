// Packages
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Routes
import SignIn from "./components/AuthPages/Login";
import SignUp from "./components/AuthPages/Signup";

// CSS
import styles from "./components/AuthPages/Auth.module.css";

const App: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
