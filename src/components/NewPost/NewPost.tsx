import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import NavBar from "../NavBar/NavBar"; // ייבוא ה-NavBar
import styles from "./NewPost.module.css"; // ייבוא ה-CSS המודולרי
import axios from "axios";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState<string>(""); // כותרת הפוסט
  const [content, setContent] = useState<string>(""); // תוכן הפוסט
  const [image, setImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]); // שמירת הקובץ שנבחר
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message
  
    if (!title || !content || !image) {
      setErrorMessage("All fields, including the image, are required.");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", image); // Ensure this key matches the backend
  
      const response = await axios.post("http://localhost:3000/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("Post created successfully:", response.data);
      setTitle("");
      setContent("");
      setImage(null);
      alert("Post created successfully!");
    } catch (error) {
      console.error("Error submitting post:", error);
      setErrorMessage("Failed to create post. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      {/* הוספת ה-NavBar */}
      <NavBar />

      {/* טופס יצירת פוסט */}
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
            {/* שדה כותרת */}
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
            {/* שדה תוכן */}
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
            {/* Error message display */}
            {errorMessage && (
              <Typography variant="body2" className={styles.errorMessage}>
                {errorMessage}
              </Typography>
            )}
            {/* כפתור שליחה */}
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
