import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post, { PostProps } from "../HomePage/Posts/Post";
import NavBar from "../NavBar/NavBar";
import { getPostById } from "../../Utils/post_service";
import styles from "./PostPage.module.css";

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostProps | null>(null);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!id) {
          setError("Post ID is missing");
          return;
        }
        const data = await getPostById(id);
        console.log(data);
        setPost(data);
      } catch (error) {
        console.error("Error loading post:", error);
        setError("Failed to load post.");
      }
    };

    fetchPost();
  }, [id]);

  const handleCommentSubmit = async () => {
    try {
      if (!id) {
        console.error("Post ID is missing");
        return;
      }

      await fetch(`/api/posts/${id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: comment }),
      });

      setComment("");

      const updatedPost = await getPostById(id);
      setPost(updatedPost);
    } catch (err) {
      console.error("Error submitting comment:", err);
    }
  };

  if (error) return <p className={styles.error}>{error}</p>;
  if (!post) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <NavBar />
      <main className={styles.main}>
        <div className={styles.postPageContainer}>
          {/* הסרנו את ה-postWrapper ושמנו רק את הפוסט עצמו */}
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
            >
              Submit Comment
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostPage;
