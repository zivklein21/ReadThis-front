import React from "react";
import GoogleIcon from "../Icons/GoogleIcon";
import readThis from "../../assets/readThis.svg"
import "./Auth.css";

interface SignUpProps {
  toggleForm: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ toggleForm }) => {
  return (
    <>
      <img src={readThis} alt="App Logo" className="app-logo" />
      <div className="auth-form">
        <h2>Sign Up</h2>
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Phone" />
        <input type="password" placeholder="Password" />

        <div className="button-group">
          <button className="signup-btn">Sign Up</button>
          <button className="google-btn">
            <GoogleIcon />
          </button>
        </div>

        <p>
          Already have an account?{" "}
          <span className="form-toggle" onClick={toggleForm}>
            Sign In
          </span>
        </p>
      </div>
    </>

  );
};

export default SignUp;