import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post, { PostProps } from "../HomePage/Posts/Post";
import NavBar from "../NavBar/NavBar";
import { getPostById, addComment } from "../../Utils/post_service";
import styles from "./PostPage.module.css";

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostProps | null>(null);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!id) {
          setError("Post ID is missing");
          return;
        }
        const data = await getPostById(id);
        setPost(data);
      } catch (error) {
        console.error("Error loading post:", error);
        setError("Failed to load post.");
      }
    };

    fetchPost();
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!id || !comment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await addComment(id, comment);
      console.log("✅ Comment added. Reloading post...");

      // טעינה מחדש של הפוסט כדי לקבל תגובות מעודכנות
      const updatedPost = await getPostById(id);
      setPost(updatedPost);

      setComment(""); // איפוס שדה התגובה
    } catch (err) {
      console.error("Error submitting comment:", err);
      setError("Failed to add comment.");
    } finally {
      setLoading(false);
    }
  };

  if (error) return <p className={styles.error}>{error}</p>;
  if (!post) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <NavBar />
      <main className={styles.main}>
        <div className={styles.postPageContainer}>
          <Post
            _id={post._id}
            title={post.title}
            content={post.content}
            owner={post.owner}
            usersWhoLiked={post.usersWhoLiked}
            comments={post.comments}
          />

          {/* אזור התגובות */}
          <div className={styles.commentSection}>
            <h3 className={styles.commentTitle}>Comments</h3>
            {post.comments.length > 0 ? (
              <div className={styles.commentList}>
                {post.comments.map((comment) => (
                  <div key={comment._id} className={styles.comment}>
                    <p className={styles.commentUser}>
                      {comment.user.username}:
                    </p>
                    <p>{comment.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.noComments}>
                No comments yet. Be the first!
              </p>
            )}

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={styles.commentInput}
              placeholder="Write your comment here..."
            />
            <button
              onClick={handleCommentSubmit}
              className={styles.commentButton}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Comment"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostPage;
