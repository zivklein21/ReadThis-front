// Packages
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import styles from "./components/AuthPages/Auth.module.css";
import Home from "./components/HomePage/Home";
import SignIn from "./components/AuthPages/Login";
import SignUp from "./components/AuthPages/Signup";
import Profile from "./components/ProfilePage/ProfilePage";

// CSS
import styles from "./components/AuthPages/Auth.module.css";

const App: React.FC = () => {
  return (
      <div className={styles.pageContainer}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
    </div>
  );
};

export default App;
