import React, { useState } from "react";
import { Link } from "react-router-dom";
import readThis from "../../assets/readThis.svg"
import "./Auth.css";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";


const googleResponseMessage = (credentialResponse:CredentialResponse) => {
  console.log("Google Error")
  console.log(credentialResponse)
}

const googleErrorMessage = () => {
  console.log("Google Error")
}

const SignIn: React.FC = () => {
  const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
  const handlePasswordToggle = () => setShowPassword(!showPassword);
  return (
    <div className="page-container">
      <img src={readThis} alt="App Logo" className="app-logo" />
      <div className="auth-form">
        <h2>Sign In</h2>
        <input type="email" placeholder="Email" />
        <div className="password-container">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span className="eye-icon" onClick={handlePasswordToggle}>
          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </span>
      </div>

        <button>Sign In</button>
        <GoogleLogin onSuccess={googleResponseMessage} onError={googleErrorMessage}/>
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="form-toggle">
            Sign Up
          </Link>
        </p>
      </div>
    </div>

  );
};

export default SignIn;