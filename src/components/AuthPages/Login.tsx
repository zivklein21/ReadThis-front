// Packages
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// CSS
import styles from "./Auth.module.css";

// Images
import readThis from "../../assets/readThis.svg";

const googleResponseMessage = (credentialResponse: CredentialResponse) => {
  console.log("Google Error");
  console.log(credentialResponse);
};

const googleErrorMessage = () => {
  console.log("Google Error");
};

const SignIn: React.FC = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordToggle = () => setShowPassword(!showPassword);
  return (
    <div className={styles.pageContainer}>
      <img src={readThis} className={styles.logo} />
      <div className={styles.authForm}>
        <h2 className={styles.formTitle}>Sign In</h2>
        <input type="email" placeholder="Email" className={styles.formInput} />
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.passwordInput}
          />
          <span className={styles.eyeIcon} onClick={handlePasswordToggle}>
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </span>
        </div>

        <button className={styles.actionButton}>Sign In</button>
        <GoogleLogin
          onSuccess={googleResponseMessage}
          onError={googleErrorMessage}
        />
        <p className={styles.text}>
          Don't have an account?{" "}
          <Link to="/signup" className={styles.formToggle}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
