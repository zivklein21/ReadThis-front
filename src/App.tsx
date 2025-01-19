// Packages
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Home from "./components/HomePage/Home";
import SignIn from "./components/AuthPages/Login";
import SignUp from "./components/AuthPages/Signup";
import Profile from "./components/ProfilePage/ProfilePage";
import NewPost from "./components/NewPost/NewPost";
import useAuth  from "./Utils/useAuth.ts";
import LoadingSpinner from "./components/LoadingSpinner.tsx";

// CSS
import styles from "./components/AuthPages/Auth.module.css";

const App: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    // Show a loading spinner while checking authentication
    return <LoadingSpinner />;
  }
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
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/signin" />} />
          <Route path="/newPost" element={isAuthenticated ? <NewPost /> : <Navigate to="/signin" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
