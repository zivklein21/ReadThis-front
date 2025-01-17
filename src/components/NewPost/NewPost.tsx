import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import NavBar from "../NavBar/NavBar"; // ייבוא ה-NavBar
import styles from "./NewPost.module.css"; // ייבוא ה-CSS המודולרי
import { createPostWithImage } from "../../Utils/post_service";

const CreatePost: React.FC = () => {
  const [bookName, setBookName] = useState<string>(""); // כותרת הפוסט
  const [content, setContent] = useState<string>(""); // תוכן הפוסט
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]); // שמירת הקובץ שנבחר
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.log("submit");
    e.preventDefault();

    const formData = new FormData();
    formData.append("Book Name", bookName);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    console.log("Post submitted:", {
      bookName,
      content,
      image: image ? image.name : null,
    });

    createPostWithImage(content, bookName);

    setBookName("");
    setContent("");
    setImage(null); // איפוס התמונה לאחר השליחה
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
              label="Book Name"
              variant="outlined"
              fullWidth
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
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
            {/* כפתור שליחה */}
            <button type="submit" className={styles.button}>
              Submit
            </button>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default CreatePost;
