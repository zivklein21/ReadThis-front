import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Paper } from "@mui/material";
import NavBar from "../NavBar/NavBar";
import styles from "./NewPost.module.css"; 
import { createPost } from "../../Utils/post_service";

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>(""); 
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
  
    if (!title || !content || !image) {
      setErrorMessage("All fields, including the image, are required.");
      return;
    }
    
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setErrorMessage("User is not logged in. Please log in and try again.");
      return;
    }

    try {
      const result = await createPost(title, content, image);
  
      console.log("Post created successfully:", result);
      setTitle("");
      setContent("");
      setImage(null);
      navigate("/");
    } catch (error) {
      console.error("Error submitting post:", error);
      setErrorMessage("Failed to create post. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <NavBar />

      <div className={styles.content}>
        <Paper className={styles.paper} elevation={3}>
          <Typography
            variant="h4"
            component="h1"
            align="center"
            gutterBottom
            className={styles.title}
          >
            Create a New Post
          </Typography>
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#c08ac7",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#c08ac7",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#c08ac7",
                },
              }}
            />
            <TextField
              label="Content"
              variant="outlined"
              fullWidth
              multiline
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#c08ac7",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#c08ac7",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#c08ac7",
                },
              }}
            />
            <Button
              variant="outlined"
              component="label"
              className={styles.uploadButton}
            >
              Upload Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </Button>
            {image && (
              <Typography variant="body2" className={styles.imageName}>
                Selected file: {image.name}
              </Typography>
            )}
            {errorMessage && (
              <Typography variant="body2" className={styles.errorMessage}>
                {errorMessage}
              </Typography>
            )}
            <button type="submit" className={styles.button} onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default CreatePost;
