import React from "react";
import { Link } from "react-router-dom";
import "../Auth.css";

const SignUp: React.FC = () => {
  return (
    <div className="auth-form">
      <h2>Sign Up</h2>
      <input type="email" placeholder="Email" />
      <input type="text" placeholder="Phone" />
      <input type="password" placeholder="Password" />
      <button>Sign Up</button>
      <p>
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp;