import React, { useState } from "react";
import "./Auth.css";
import readThis from "../../assets/readThis.svg"
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handlePasswordToggle = () => setShowPassword(!showPassword);
  const handleConfirmPasswordToggle = () => setShowConfirmPassword(!showConfirmPassword);
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(event.target.files[0]);
    }
  };

  return (
    <div className="page-container">
      <img src={readThis} alt="App Logo" className="app-logo" />
      <div className="auth-form">
      <h2>Sign Up</h2>

      <input type="text" placeholder="Username" required />
      <input type="email" placeholder="Email" required />

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

      <div className="password-container">
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <span className="eye-icon" onClick={handleConfirmPasswordToggle}>
          {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </span>
      </div>

      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {profileImage && (
        <div className="image-preview">
          <img src={URL.createObjectURL(profileImage)} alt="Profile Preview" />
        </div>
      )}

        <button className="signup-btn">Sign Up</button>
        <GoogleLogin onSuccess={googleResponseMessage} onError={googleErrorMessage}/>


      <p>
        Already have an account?{" "}
        <span className="form-toggle" onClick={toggleForm}>
          Sign In
        </span>
      </p>
      </div>
    </div>
  );
};

export default SignUp;