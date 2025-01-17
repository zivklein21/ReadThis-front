import styles from "./Post.module.css";
import React from "react";

export interface PostProps {
  _id: string;
  content: string;
  title: string;
  author: string;
}

const Post: React.FC<PostProps> = ({ title, content, author }) => {
  return (
    <div className={styles.post}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.content}>{content}</p>
      <p className={styles.author}>Written by: {author}</p>
    </div>
  );
};

export default Post;
