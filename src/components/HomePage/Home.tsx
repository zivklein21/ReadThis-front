import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import styles from "./Home.module.css";
import Post, { PostProps } from "./Posts/Post";
import { getPosts } from "../../Utils/post_service";
import { FaPlus } from "react-icons/fa";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const data = await getPosts(); // קריאה לפונקציית השירות
        setPosts(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load posts.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePost = () => {
    navigate("/newpost"); // ניווט לעמוד יצירת פוסט
  };

  return (
    <div className={styles.container}>
      <NavBar />

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.postsContainer}>
          {isLoading && <p>Loading...</p>}
          {error && <p className={styles.error}>Error: {error}</p>}
          {!isLoading && !error && posts.length > 0
            ? posts.map((post) => (
                <Post
                  key={post._id}
                  _id={post._id}
                  title={post.title}
                  content={post.content}
                  author={post.author}
                  usersWhoLiked={post.usersWhoLiked || []}
                  comments={post.comments || []}
                />
              ))
            : !isLoading &&
              !error && (
                <p className={styles.noPosts}>
                  No posts available at the moment.
                </p>
              )}
        </div>
      </main>

      {/* Create Post Button */}
      <button className={styles.createPostButton} onClick={handleCreatePost}>
        <FaPlus className={styles.plusIcon} />
      </button>
    </div>
  );
};

export default Home;
