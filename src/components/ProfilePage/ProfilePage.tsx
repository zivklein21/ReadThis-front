import React, { useState } from "react";
import styles from "./ProfilePage.module.css";
import NavBar from "../NavBar/NavBar";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface BookPost {
  id: number;
  title: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState({
    username: "ZivKlein",
    email: "zivklein21@gmail.com",
    profileImage: "https://via.placeholder.com/100",
  });

  const [bookPosts] = useState<BookPost[]>([
    { id: 1, title: "Post 1" },
    { id: 2, title: "Post 2" },
    { id: 3, title: "Post 3" },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(user.username);
  const [newProfileImage, setNewProfileImage] = useState<string | null>(null);

  // Handle Image Upload
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageURL = URL.createObjectURL(event.target.files[0]);
      setNewProfileImage(imageURL);
    }
  };

  // Save Changes
  const handleSave = () => {
    setUser((prevUser) => ({
      ...prevUser,
      username: newUsername,
      profileImage: newProfileImage || prevUser.profileImage,
    }));
    setIsEditing(false);
  };

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.profileContainer}>
        <div className={styles.profileBox}>
          <h2 className={styles.sectionTitle}>My Profile</h2>
          <div className={styles.profileInfo}>
            
            {/* ✅ Profile Image OR Upload Icon (Keeps Space) */}
            <div className={styles.profileImageContainer}>
              {isEditing ? (
                <>
                  <label htmlFor="profileImageUpload" className={styles.uploadIcon}>
                    <CloudUploadIcon fontSize="large" />
                  </label>
                  <input
                    type="file"
                    id="profileImageUpload"
                    accept="image/*"
                    className={styles.hiddenInput}
                    onChange={handleImageChange}
                  />
                </>
              ) : (
                <img
                  src={newProfileImage || user.profileImage}
                  alt="Profile"
                  className={styles.profileImage}
                />
              )}
            </div>

            {/* ✅ Username & Email Stay in Place */}
            <div className={styles.profileDetails}>
              <div className={styles.profileText}>
                {isEditing ? (
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className={styles.usernameInput}
                  />
                ) : (
                  <h3 className={styles.username}>{user.username}</h3>
                )}
                <span className={styles.separator}>|</span>
                <p className={styles.profileEmail}>{user.email}</p>
              </div>
            </div>

            {/* ✅ Edit/Save Button */}
            <button
              className={`${styles.editBtn} ${isEditing ? styles.saveBtn : ""}`}
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            >
              {isEditing ? <SaveIcon /> : <EditIcon />}
            </button>
          </div>
        </div>

        {/* Posts Section */}
        <div className={styles.postsBox}>
          <h3 className={styles.sectionTitle}>My Posts</h3>
          <div className={styles.postsContainer}>
            {bookPosts.map((post) => (
              <div key={post.id} className={styles.postCard}>
                <h4>{post.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;