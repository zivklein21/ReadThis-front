import React, { useState } from "react";
import { FaHeart, FaComment } from "react-icons/fa";
import { likePost, unlikePost } from "../../../Utils/post_service"; // Adjust import path based on your project structure
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Post.module.css";
import { SERVER_URL, DEFAULT_IMAGE } from "../../../Utils/vars";

// Define PostProps interface
export interface PostProps {
  _id: string;
  title: string;
  content: string;
  owner: {
    _id: string;
    username: string;
    image: string;
  };
  imageUrl: string;
  usersWhoLiked: string[];
  comments: {
    _id: string;
    user: {
      _id: string;
      username: string;
      image: string;
    };
    text: string;
  }[];
}

const Post: React.FC<PostProps> = ({
  _id,
  title,
  content,
  owner,
  usersWhoLiked = [],
  comments = [],
  imageUrl,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(
    localStorage.getItem("userId")
      ? usersWhoLiked.includes(localStorage.getItem("userId")!)
      : false
  );

  console.log("🔍 Checking imageUrl for post:", imageUrl);
  const handleLike = async () => {
    try {
      if (liked) {
        await unlikePost(_id);
        setLiked(false);
        usersWhoLiked.splice(
          usersWhoLiked.indexOf(localStorage.getItem("userId")!),
          1
        );
      } else {
        await likePost(_id);
        setLiked(true);
        usersWhoLiked.push(localStorage.getItem("userId")!);
      }
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        setOpen(true);
      }
      console.log(error);
    }
  };

  const handleViewPost = () => {
    navigate(`/post/${_id}`); // ✅ הוספתי שורה זו
  };

  return (
    <div className={styles.post}>
      {/* Post Title */}
      <h3 className={styles.title}>{title}</h3>

      {imageUrl && (
        <img
          src={`${SERVER_URL}${imageUrl}`}
          alt="Post image"
          className={styles.postImage}
          onError={(event) => {
            event.currentTarget.src = DEFAULT_IMAGE; // הצגת תמונת ברירת מחדל במקרה של שגיאה
          }}
        />
      )}

      {/* Post Content */}
      <p className={styles.content}>{content}</p>

      {/* Post Author */}
      <p className={styles.author}>Written by: {owner.username}</p>

      {/* Like and Comment Actions */}
      <div className={styles.actionContainer}>
        {/* Like Section */}
        <div className={styles.likeContainer}>
          <FaHeart
            className={`${styles.likeIcon} ${liked ? styles.liked : ""}`}
            onClick={handleLike}
          />
          <span className={styles.likeCount}>{usersWhoLiked.length}</span>
        </div>

        {/* Comment Section - שינוי כאן כדי להעביר לעמוד הפוסט */}
        <div className={styles.commentContainer} onClick={handleViewPost}>
          {" "}
          {/* ✅ הוספתי שינוי כאן */}
          <FaComment className={styles.commentIcon} />
          <span className={styles.commentCount}>{comments.length}</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
