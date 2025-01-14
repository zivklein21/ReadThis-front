// Packages
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Home from "./components/HomePage/Home";
import SignIn from "./components/AuthPages/Login";
import SignUp from "./components/AuthPages/Signup";
import Profile from "./components/ProfilePage/ProfilePage";
import NewPost from "./components/NewPost/NewPost";
import { useAuth } from "./hooks/useAuth.ts";

// CSS
import styles from "./components/AuthPages/Auth.module.css";

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className={styles.pageContainer}>
      <Router>
        <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/signin" />}
        />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/newpost" element={<NewPost />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
