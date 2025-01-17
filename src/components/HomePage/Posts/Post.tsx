import styles from "./Post.module.css";
import React, { useState } from "react";
import { FaHeart, FaComment } from "react-icons/fa";

export interface PostProps {
  _id: string;
  content: string;
  title: string;
  author: string;
  likes: number;
  comments: string;
}

const Post: React.FC<PostProps> = ({
  title,
  content,
  author,
  likes,
  comments,
}) => {
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

  const handleCommentClick = () => {
    console.log(`Navigate to comments for post: ${_id}`);
    // כאן תבצעי ניווט למסך התגובות
  };

  return (
    <div className={styles.post}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.content}>{content}</p>
      <p className={styles.author}>Written by: {author}</p>
      <div className={styles.actionContainer}>
        <div className={styles.likeContainer}>
          <FaHeart
            className={`${styles.likeIcon} ${liked ? styles.liked : ""}`}
            onClick={handleLike}
          />
          <span className={styles.likeCount}>{currentLikes}</span>
        </div>
        <div className={styles.commentContainer} onClick={handleCommentClick}>
          <FaComment className={styles.commentIcon} />
          <span className={styles.commentCount}>{comments}</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
