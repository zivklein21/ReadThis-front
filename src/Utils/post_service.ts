import apiClient from "./api";

interface PostsResponse {
  _id: string;
  content: string;
  title: string;
  author: string;
}

export const createPostWithImage = async (
  content: string,
  title: string
): Promise<void> => {
  try {
    const owner = "gefen";
    console.log("Sending post data:" + title + " " + content + " " + owner);
    await apiClient.post("/posts", { title, content, owner });
    console.log("Post created successfully!");
  } catch (error) {
    console.error("Failed to create post:", error);
    throw error;
  }
};
