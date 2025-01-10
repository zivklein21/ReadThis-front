import React from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const SignIn: React.FC = () => {
  return (
    <div className="auth-form">
      <h2>Sign In</h2>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Login</button>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;