// React + Packages
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// CSS
import styles from "./Auth.module.css";

// Images
import readThis from "../../assets/readThis.svg";

// Services

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Handle toggling password visibility
  const handlePasswordToggle = () => setShowPassword(!showPassword);

  // Handle sign in with your backend
  const handleSignIn = async () => {
    try {
      setError("");
      const data = await signIn(email, password);
      console.log("SignIn response", data);
      // Example: data might contain a JWT token, user info, etc.
      // You can store it in context, localStorage, etc.
      // localStorage.setItem("token", data.token);

      // Navigate the user to a protected route or homepage
      navigate("/dashboard");
    } catch (err: any) {
      // Handle error (e.g., display a message to the user)
      setError(err.response?.data?.message || "An error occurred during sign in");
    }
  };

  // Handle Google sign in callback
  const googleResponseMessage = (credentialResponse: CredentialResponse) => {
    console.log("Google sign in response", credentialResponse);
    // You would also send this credential to your backend
    // to complete the Google OAuth flow
  };

  const googleErrorMessage = () => {
    console.log("Google sign in error");
  };

  return (
    <div className={styles.pageContainer}>
      <img src={readThis} className={styles.logo} />
      <div className={styles.authForm}>
        <h2 className={styles.formTitle}>Sign In</h2>
        
        {error && <p className={styles.error}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className={styles.formInput}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.passwordInput}
          />
          <span className={styles.eyeIcon} onClick={handlePasswordToggle}>
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </span>
        </div>

        <button
          className={styles.actionButton}
          onClick={handleSignIn}
        >
          Sign In
        </button>

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