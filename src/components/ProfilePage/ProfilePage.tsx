import React, { useState } from "react";
import "./ProfilePage.css";

interface Post {
  id: number;
  content: string;
}

const Profile: React.FC = () => {
  // Dummy user data (Replace with real data from API later)
  const [user, setUser] = useState({
    username: "ZivKlein",
    email: "zivklein21@gmail.com",
    profileImage: "https://via.placeholder.com/100", // Placeholder image
  });

  const [posts] = useState<Post[]>([
    { id: 1, content: "First post! 🎉" },
    { id: 2, content: "Loving this app!" },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(user.username);
  const [newProfileImage, setNewProfileImage] = useState<File | null>(null);

  // Handle updating username
  const handleSaveChanges = () => {
    setUser((prevUser) => ({
      ...prevUser,
      username: newUsername,
      profileImage: newProfileImage ? URL.createObjectURL(newProfileImage) : prevUser.profileImage,
    }));
    setIsEditing(false);
  };

  // Handle profile image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setNewProfileImage(event.target.files[0]);
    }
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      {/* Profile Image */}
      <div className="profile-image-container">
        <img src={newProfileImage ? URL.createObjectURL(newProfileImage) : user.profileImage} alt="Profile" />
        {isEditing && <input type="file" accept="image/*" onChange={handleImageUpload} />}
      </div>

      {/* User Details */}
      <div className="profile-details">
        {isEditing ? (
          <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
        ) : (
          <h3>{user.username}</h3>
        )}
        <p>{user.email}</p>
      </div>

      {/* Edit Button */}
      {isEditing ? (
        <button onClick={handleSaveChanges} className="save-btn">
          Save Changes
        </button>
      ) : (
        <button onClick={() => setIsEditing(true)} className="edit-btn">
          Edit Profile
        </button>
      )}

      {/* User Posts */}
      <h3>My Posts</h3>
      <div className="posts-container">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post">
              <p>{post.content}</p>
            </div>
          ))
        ) : (
          <p>No posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;