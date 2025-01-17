import styles from "./Post.module.css";
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

export interface PostProps {
  _id: string;
  content: string;
  title: string;
  author: string;
  likes: number;
}

const Post: React.FC<PostProps> = ({ title, content, author, likes }) => {
  const [currentLikes, setCurrentLikes] = useState<number>(likes); // מספר הלייקים
  const [liked, setLiked] = useState<boolean>(false); // האם המשתמש לחץ לייק

  const handleLike = () => {
    if (!liked) {
      setCurrentLikes((prevLikes) => prevLikes + 1); // הוספת לייק
    } else {
      setCurrentLikes((prevLikes) => prevLikes - 1); // ביטול לייק
    }
    setLiked(!liked); // שינוי מצב לייק
    // ניתן להוסיף קריאה לשרת כאן כדי לעדכן לייקים
  };

  return (
    <div className={styles.post}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.content}>{content}</p>
      <p className={styles.author}>Written by: {author}</p>
      <div className={styles.likeContainer}>
        <FaHeart
          className={`${styles.likeIcon} ${liked ? styles.liked : ""}`}
          onClick={handleLike}
        />
        <span className={styles.likeCount}>{currentLikes}</span>
      </div>
    </div>
  );
};

export default Post;
