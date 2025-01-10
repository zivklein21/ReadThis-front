import React from "react";
import Home from "./components/HomePage/Home";
import SignIn from "./components/AuthPages/Login";
import SignUp from "./components/AuthPages/Signup";
import Profile from "./components/ProfilePage/ProfilePage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./components/AuthPages/Auth.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App: React.FC = () => {

  return (
      <div className="page-container">
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/signin" />}/>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
    </div>
  );
};

export default App;
