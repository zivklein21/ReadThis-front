// Packages
import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { AxiosError } from "axios";

// CSS
import styles from "./Auth.module.css";

// Images
import readThis from "../../assets/readThis.svg";

// Utils
import axiosInstance from "../../Utils/serverInstance"; // import our axios instance

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handlePasswordToggle = () => setShowPassword(!showPassword);
  const handleConfirmPasswordToggle = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(event.target.files[0]);
    }
  };

  // ---- NEW: sign up function
  const handleSignUp = async () => {
    try {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const response = await axiosInstance.post("/auth/register", {
        email,
        password,
      });

      console.log("Registration success:", response.data);
      alert("User registered successfully!");
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.response?.data);
    }
  };

  const googleResponseMessage = (credentialResponse: CredentialResponse) => {
    console.log("Google Response:", credentialResponse);
  };

  const googleErrorMessage = () => {
    console.log("Google Error");
  };

  return (
    <div className={styles.pageContainer}>
      <img src={readThis} alt="App Logo" className={styles.logo} />
      <div className={styles.authForm}>
        <h2 className={styles.formTitle}>Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          required
          className={styles.formInput}
        />
        <input
          type="email"
          placeholder="Email"
          required
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
            required
            className={styles.passwordInput}
          />
          <span className={styles.eyeIcon} onClick={handlePasswordToggle}>
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </span>
        </div>

        <div className={styles.passwordContainer}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={styles.passwordInput}
          />
          <span
            className={styles.eyeIcon}
            onClick={handleConfirmPasswordToggle}
          >
            {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </span>
        </div>

        <Button
          variant="outlined"
          component="label"
          className={styles.uploadButton}
        >
          Upload Image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />
        </Button>
        {profileImage && (
          <Typography variant="body2" className={styles.imageName}>
            Selected file: {profileImage.name}
          </Typography>
        )}

        <button className={styles.actionButton} onClick={handleSignUp}>
          Sign Up
        </button>

        <GoogleLogin
          onSuccess={googleResponseMessage}
          onError={googleErrorMessage}
        />

        <p className={styles.text}>
          Already have an account?{" "}
          <Link to="/signin" className={styles.formToggle}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;