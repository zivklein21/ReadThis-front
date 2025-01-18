import styles from "./Post.module.css";
import React, { useState } from "react";
import { FaHeart, FaComment } from "react-icons/fa";

export interface PostProps {
  _id: string;
  content: string;
  title: string;
  author: string;
  usersWhoLiked: [];
  comments: {
    _id: string;
    user: {
      _id: string;
      name: string;
      image: string;
    };
    text: string;
  }[];
}

const Post: React.FC<PostProps> = ({
  title,
  content,
  author,
  usersWhoLiked = [],
  comments = [],
}) => {
  const [currentLikes, setCurrentLikes] = useState<string[]>(usersWhoLiked); // מספר הלייקים
  const [liked, setLiked] = useState<boolean>(false); // האם המשתמש לחץ לייק

  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  console.log(comments);

  const handleLike = () => {
    if (liked) {
      // הסרת לייק
      setCurrentLikes((prevLikes) =>
        prevLikes.filter((userId) => userId !== "currentUserId")
      );
    } else {
      // הוספת לייק
      setCurrentLikes((prevLikes) => [...prevLikes, "currentUserId"]);
    }
    setLiked(!liked); // שינוי מצב לייק
  };

  const handleCommentToggle = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    // ניתן להוסיף קריאה לשרת כאן
    console.log("Adding comment:", newComment);

    setNewComment(""); // איפוס שדה התגובה
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
          <span className={styles.likeCount}>{currentLikes.length}</span>
        </div>

        <div className={styles.commentContainer} onClick={handleCommentToggle}>
          <FaComment className={styles.commentIcon} />
          <span className={styles.commentCount}>{comments.length}</span>
        </div>
      </div>

      {/* תצוגת תגובות */}
      {showComments && (
        <div className={styles.commentsSection}>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className={styles.comment}>
                <img
                  src={comment.user.image}
                  alt={comment.user.name}
                  className={styles.commentUserImage}
                />
                <div>
                  <p className={styles.commentUserName}>{comment.user.name}</p>
                  <p className={styles.commentText}>{comment.text}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No comments yet</p>
          )}

          {/* הוספת תגובה */}
          <div className={styles.addComment}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className={styles.commentInput}
            />
            <button onClick={handleAddComment} className={styles.commentButton}>
              Add Comment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
