import React from "react";
import readThis from "../../assets/readThis.svg"
import "./Auth.css";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

interface SignUpProps {
  toggleForm: () => void;
}

const googleResponseMessage = (credentialResponse:CredentialResponse) => {
  console.log("Google Error")
  console.log(credentialResponse)
}

const googleErrorMessage = () => {
  console.log("Google Error")
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

          <button className="signup-btn">Sign Up</button>
          <GoogleLogin onSuccess={googleResponseMessage} onError={googleErrorMessage}/>

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