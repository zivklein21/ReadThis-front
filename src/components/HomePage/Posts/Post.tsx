import React, { useState } from "react";
import { FaHeart, FaComment } from "react-icons/fa";
import { likePost, unlikePost } from "../../../Utils/post_service"; // Adjust import path based on your project structure
import { isAxiosError } from "axios";
import styles from "./Post.module.css";

// Define PostProps interface
export interface PostProps {
  _id: string;
  title: string;
  content: string;
  owner: string; // Assuming "owner" is mapped to "author" on the frontend
  usersWhoLiked: string[];
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
  _id,
  title,
  content,
  owner,
  usersWhoLiked = [],
  comments = [],
}) => {
  const [currentLikes, setCurrentLikes] = useState<string[]>(usersWhoLiked);
  const [liked, setLiked] = useState<boolean>(
    localStorage.getItem("userId")
      ? usersWhoLiked.includes(localStorage.getItem("userId")!)
      : false
  );
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleLike = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User not logged in");
      return; // Optionally, show an alert or redirect to login
    }

    try {
      if (liked) {
        await unlikePost(_id);
        setLiked(false);
        setCurrentLikes((prevLikes) => prevLikes.filter((id) => id !== userId));
      } else {
        await likePost(_id);
        setLiked(true);
        setCurrentLikes((prevLikes) => [...prevLikes, userId]);
      }
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        console.error("Unauthorized: Please log in");
      }
      console.error("Error updating like status:", error);
    }
  };

  const handleCommentToggle = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    // Add comment logic (optional: integrate backend comment functionality here)
    console.log("Adding comment:", newComment);

    setNewComment(""); // Clear the input field after submitting
  };

  return (
    <div className={styles.post}>
      {/* Post Title */}
      <h3 className={styles.title}>{title}</h3>

      {/* Post Content */}
      <p className={styles.content}>{content}</p>

      {/* Post Author */}
      <p className={styles.author}>Written by: {owner}</p>

      {/* Like and Comment Actions */}
      <div className={styles.actionContainer}>
        {/* Like Section */}
        <div className={styles.likeContainer}>
          <FaHeart
            className={`${styles.likeIcon} ${liked ? styles.liked : ""}`}
            onClick={handleLike}
          />
          <span className={styles.likeCount}>{currentLikes.length}</span>
        </div>

        {/* Comment Section */}
        <div className={styles.commentContainer} onClick={handleCommentToggle}>
          <FaComment className={styles.commentIcon} />
          <span className={styles.commentCount}>{comments.length}</span>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className={styles.commentsSection}>
          {/* Display Existing Comments */}
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

          {/* Add Comment Section */}
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
