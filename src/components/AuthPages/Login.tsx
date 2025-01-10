import React from "react";
import readThis from "../../assets/readThis.svg"
import "./Auth.css";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

interface SignInProps {
  toggleForm: () => void;
}

const googleResponseMessage = (credentialResponse:CredentialResponse) => {
  console.log("Google Error")
  console.log(credentialResponse)
}

const googleErrorMessage = () => {
  console.log("Google Error")
}

const SignIn: React.FC<SignInProps> = ({ toggleForm }) => {
  return (
    <>
      <img src={readThis} alt="App Logo" className="app-logo" />
      <div className="auth-form">
        <h2>Sign In</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button>Sign In</button>
        <GoogleLogin onSuccess={googleResponseMessage} onError={googleErrorMessage}/>
        <p>
          Don't have an account?{" "}
          <span className="form-toggle" onClick={toggleForm}>
            Sign Up
          </span>
        </p>
      </div>
    </>

  );
};

export default SignIn;