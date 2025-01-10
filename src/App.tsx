import React, { useState } from "react";
import SignIn from "./components/AuthPages/Login";
import SignUp from "./components/AuthPages/Signup";
import "./components/AuthPages/Auth.css";

const App: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="page-container">
      {isSignUp ? (
        <SignUp toggleForm={() => setIsSignUp(false)} />
      ) : (
        <SignIn toggleForm={() => setIsSignUp(true)} />
      )}
    </div>
  );
};

export default App;