import { PostProps } from "../components/HomePage/Posts/Post";
import apiClient from "./api-client";
import { PostProps } from "../components/HomePage/Posts/Post";

interface PostsResponse {
  _id: string;
  content: string;
  title: string;
  author: string;
}

const DEFAULT_POST: PostProps = {
  _id: "",
  title: "Untitled",
  content: "No content available",
  author: "Anonymous",
};

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

export const getPosts = async () => {
  try {
    const data: PostsResponse[] = (await apiClient.get("/posts")).data;
    return data
      .map((post: PostsResponse) => ({
        ...DEFAULT_POST,
        ...post,
        id: post._id,
      }))
      .reverse();
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch posts from the server."
    );
  }
};
