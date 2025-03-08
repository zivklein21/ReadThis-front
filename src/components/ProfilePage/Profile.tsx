import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import IconButton from "@mui/material/IconButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";
import { getMyProfile, updateProfile } from "../../Utils/user_service";
import { getMyPosts, deletePost } from "../../Utils/post_service";
import { SERVER_URL } from "../../Utils/vars";
import Post from "../HomePage/Posts/Post";

interface IUser {
  _id: string;
  username: string;
  email: string;
  imageUrl: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newProfileImage, setNewProfileImage] = useState<string | null>(null);
  const [newProfileImageFile, setNewProfileImageFile] = useState<File | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    try {
      const userData = await getMyProfile();
      setUser(userData);
      setNewUsername(userData.username);
    } catch (err: any) {
      setError(err.message || "Failed to fetch user data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const myPosts = await getMyPosts();
      setPosts(myPosts);
    } catch (err: any) {
      setError(err.message || "Failed to fetch posts.");
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchUserPosts();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setNewProfileImage(URL.createObjectURL(event.target.files[0]));
      setNewProfileImageFile(event.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (user) {
      const formData = new FormData();
      formData.append("username", newUsername);
      if (newProfileImageFile) formData.append("image", newProfileImageFile);

      try {
        const updatedUser = await updateProfile(formData);
        setUser(updatedUser);
        setNewProfileImage(null);
        setIsEditing(false);
      } catch (err: any) {
        setError(err.message || "Error saving profile.");
      }
    }
  };


  const handleEditPost = (postId: string) => navigate(`/editpost/${postId}`);

  const handleDeletePost = async (postId: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      await deletePost(postId);
      fetchUserPosts();
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!user) return <div className={styles.error}>No user data found.</div>;

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.profileBox}>
        <h2 className={styles.sectionTitle}>My Profile</h2>
        <div className={styles.profileCard}>
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
                className={styles.profileImage}
                src={newProfileImage || `${SERVER_URL}${user.imageUrl}`}
                alt={user.username}
              />
            )}
          </div>
          <div className={styles.profileDetails}>
            {isEditing ? (
              <input
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className={styles.usernameInput}
              />
            ) : (
              <h3 className={styles.username}>{user.username}</h3>
            )}
            <p className={styles.email}>{user.email}</p>
          </div>
          <IconButton
            className={styles.editButton}
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          >
            {isEditing ? <SaveIcon /> : <EditIcon />}
          </IconButton>
        </div>
      </div>

      <div className={styles.postsBox}>
        <h3 className={styles.sectionTitle}>My Posts</h3>
        <div className={styles.postsContainer}>
          {posts.length ? (
            posts.map((post) => (
              <div key={post._id} className={styles.postWrapper}>
                <Post
                  _id={post._id}
                  title={post.title}
                  content={post.content}
                  owner={post.owner}
                  usersWhoLiked={post.usersWhoLiked}
                  comments={post.comments}
                />
                <div className={styles.postActions}>
                  <button
                    className={styles.editPostBtn}
                    onClick={() => handleEditPost(post._id)}
                  >
                    <IconButton className={styles.editButton}>
                      <EditIcon />
                    </IconButton>
                  </button>
                  <button
                    className={styles.deletePostBtn}
                    onClick={() => handleDeletePost(post._id)}
                  >
                    <IconButton className={styles.editButton}>
                      <DeleteIcon />
                    </IconButton>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noPosts}>No posts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;