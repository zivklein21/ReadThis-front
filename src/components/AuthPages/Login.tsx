import React from "react";
import GoogleIcon from "../Icons/GoogleIcon";
import "./Auth.css";

interface SignInProps {
  toggleForm: () => void;
}

const SignIn: React.FC<SignInProps> = ({ toggleForm }) => {
  return (
    <div className="auth-form">
      <h2>Sign In</h2>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />

      <div className="button-group">
        <button>Sign In</button>
        <button className="google-btn">
          <GoogleIcon />
        </button>
      </div>
      <p>
        Don't have an account?{" "}
        <span className="form-toggle" onClick={toggleForm}>
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default SignIn;