import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/HomePage/Home";
import React, { useState } from "react";
import SignIn from "./components/AuthPages/Login";
import SignUp from "./components/AuthPages/Signup";
import "./components/AuthPages/Auth.css";

const App: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="page-container">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={ <SignIn toggleForm={() => setIsSignUp(true)} />} />
          <Route path="/signup" element={<SignUp toggleForm={() => setIsSignUp(false)} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
