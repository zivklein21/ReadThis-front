import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import styles from "./Home.module.css";
import Post, { PostProps } from "./Posts/Post";
import { fetchAllPosts } from "../../Utils/post_service";
import { FaPlus } from "react-icons/fa";

// Define the backend IPost structure
export interface IPost {
  _id: string;
  title: string;
  content: string;
  owner: string; // Backend uses 'owner' instead of 'author'
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

const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const data: IPost[] = await fetchAllPosts(); // Fetch backend posts

        // Transform IPost to PostProps
        const transformedPosts: PostProps[] = data.map((post) => ({
          _id: post._id,
          title: post.title,
          content: post.content,
          author: post.owner, // Map 'owner' to 'author'
          usersWhoLiked: post.usersWhoLiked,
          comments: post.comments,
        }));

        setPosts(transformedPosts);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load posts.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePost = () => {
    navigate("/newpost"); // Navigate to the "Create New Post" page
  };

  return (
    <div className={styles.container}>
      <NavBar />

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.postsContainer}>
          {isLoading && <p>Loading...</p>}
          {error && <p className={styles.error}>Error: {error}</p>}
          {!isLoading && !error && posts.length > 0 ? (
            posts.map((post) => (
              <Post
                key={post._id}
                _id={post._id}
                title={post.title}
                content={post.content}
                author={post.author}
                usersWhoLiked={post.usersWhoLiked}
                comments={post.comments}
              />
            ))
          ) : (
            !isLoading &&
            !error && <p className={styles.noPosts}>No posts available at the moment.</p>
          )}
        </div>
      </main>

      {/* Create Post Button */}
      <button
        className={styles.createPostButton}
        onClick={handleCreatePost}
        title="Create a New Post"
      >
        <FaPlus className={styles.plusIcon} />
      </button>
    </div>
  );
};

export default Home;