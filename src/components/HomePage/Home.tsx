import React from "react";
import NavBar from "../NavBar/NavBar";
import styles from "./Home.module.css";
import Post, { PostProps } from "./Posts/Post";

const Home: React.FC = () => {
  const posts: PostProps[] = [
    {
      _id: "1",
      title: "First Post",
      content: "This is the first post content.",
      author: "John Doe",
    },
    {
      _id: "2",
      title: "Second Post",
      content: "This is the second post content.",
      author: "Jane Smith",
    },
    {
      _id: "3",
      title: "Third Post",
      content: "This is the third post content.",
      author: "Alice Johnson",
    },
  ];

  return (
    <div className={styles.container}>
      <NavBar />

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.postsContainer}>
          {posts.length > 0 ? (
            posts.map((post) => (
              <Post
                key={post._id}
                _id={post._id}
                title={post.title}
                content={post.content}
                author={post.author}
              />
            ))
          ) : (
            <p className={styles.noPosts}>No posts available at the moment.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
