// Packages
import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

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

const SignUp: React.FC = () => {
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

        <button className={styles.actionButton}>Sign Up</button>
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
