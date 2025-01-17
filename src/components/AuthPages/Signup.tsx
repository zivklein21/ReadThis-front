import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import axios, { AxiosError } from "axios";

// Service

// CSS
import styles from "./Auth.module.css";

// Images
import readThis from "../../assets/readThis.svg";

const SignUp: React.FC = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handlePasswordToggle = () => setShowPassword(!showPassword);
  const handleConfirmPasswordToggle = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(event.target.files[0]);
    }
  };

  const handleSignUp = async () => {
    setErrorMessage(""); // Reset error message before new request
  
    if (!username || !email || !password || !confirmPassword || !profileImage) {
      setErrorMessage("All fields, including the profile image, are required.");
      return;
    }
  
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }
  
    try {
      console.log("Sending signup request to backend...");
  
      // Create a FormData object
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("image", profileImage); // Profile image key must match multer configuration
  
      // Send the form data to the backend
      const response = await axios.post("http://localhost:3000/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, // Include credentials (if needed, like cookies)
      });
  
      console.log("Signup success:", response.data);
      setErrorMessage(""); // Clear any existing error message
      alert("User registered successfully!");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      console.error("Signup error:", error);
  
      if (error.response) {
        setErrorMessage(
          error.response.data?.message || "Signup failed. Please try again."
        );
      } else {
        setErrorMessage(
          "Signup failed: Network error. Please check your connection."
        );
      }
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

        {errorMessage && (
          <Typography className={styles.errorLabel}>{errorMessage}</Typography>
        )}

        <input
          type="text"
          placeholder="Username"
          required
          className={styles.formInput}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
