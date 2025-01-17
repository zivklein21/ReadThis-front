import apiClient from "./api";

interface PostsResponse {
  _id: string;
  content: string;
  title: string;
  author: string;
}

export const createPostWithImage = async (
  content: string,
  bookName: string
): Promise<void> => {
  try {
    const owner = "gefen";
    console.log("Sending post data:" + bookName + " " + content + " " + owner);
    await apiClient.post("/posts", { bookName, content, owner });
    console.log("Post created successfully!");
  } catch (error) {
    console.error("Failed to create post:", error);
    throw error;
  }
};
