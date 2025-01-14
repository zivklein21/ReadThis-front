// React + Packages
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import styles from "./Auth.module.css";
import readThis from "../../assets/readThis.svg";
<<<<<<< HEAD
import { AxiosError } from "axios";
import { signIn } from "../../Utils/api";
=======

import { AxiosError } from "axios"; // Import AxiosError
// Services
import { signIn } from "../../Utils/auth-service";
>>>>>>> d5c4dc8 (Connect signin and signup to back:)

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const handlePasswordToggle = () => setShowPassword(!showPassword);
<<<<<<< HEAD
=======

  // Handle sign in with your backend
  

>>>>>>> d5c4dc8 (Connect signin and signup to back:)
  const handleSignIn = async () => {
    try {
      setError("");
      console.log("Attempting login...");
  
<<<<<<< HEAD
      const data = await signIn(username, password);
      console.log("Login successful:", data);
    
      navigate("/");
    } catch (error) {
=======
      const data = await signIn(email, password);
      console.log("Login successful:", data);
  
      alert("Login successful!");
  
      // Redirect user after login
      navigate("/");
    } catch (error) {
      // Explicitly type the error as an AxiosError
>>>>>>> d5c4dc8 (Connect signin and signup to back:)
      const axiosError = error as AxiosError<{ message?: string }>;
  
      console.error("Login failed:", axiosError);
  
<<<<<<< HEAD
      setError(axiosError.response?.data?.message || "Incorrect Username or password");
=======
      // Extract error message safely
      setError(axiosError.response?.data?.message || "Incorrect email or password");
>>>>>>> d5c4dc8 (Connect signin and signup to back:)
    }
  };

  const googleResponseMessage = (credentialResponse: CredentialResponse) => {
    console.log("Google sign in response", credentialResponse);
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
          type="text"
          placeholder="Username"
          className={styles.formInput}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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