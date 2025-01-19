
import {api} from "./api";
import { AxiosError } from "axios";


interface PostsResponse {
  _id: string;
  content: string;
  title: string;

  owner: string;

  usersWhoLiked: [];
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

const DEFAULT_POST: PostProps = {
  _id: "",
  title: "Untitled",
  content: "No content available",
  author: "Anonymous",
};

export const createPost = async (
  title: string,
export const createPostWithImage = async (

  content: string,
  postImage: File,
) => {
  try {
    const owner = localStorage.getItem("userId");
    if (!owner) {
      throw new Error("User ID not found in localStorage. Please log in again.");
    }
    // Create a FormData object for `multipart/form-data`
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("owner", owner);
    formData.append("postImage", postImage); // Ensure this matches the `req.file` field on the back-end

    // Send POST request
    const response = await api.post("/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true, // Optional if authentication cookies are used
    });

    console.log("Post created successfully:", response.data);
    return response.data; // Return the response data if needed
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    console.error("Error creating post:", axiosError.response?.data || axiosError.message);
    throw axiosError;
  }
};

export const getAllPosts = async (owner?: string): Promise<PostsResponse[]> => {
  try {
    const params = owner ? { owner } : undefined; // Attach query param if owner is provided
    const response = await api.get<PostsResponse[]>("/posts", { params });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    console.error("Error fetching posts:", axiosError.response?.data || axiosError.message);
    throw axiosError;
  }
};

export const getPostById = async (id: string): Promise<PostsResponse> => {
  try {
    const response = await api.get<PostsResponse>(`/posts/${id}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    console.error("Error fetching post:", axiosError.response?.data || axiosError.message);
    throw axiosError;
  }
};

export const deletePost = async (id: string): Promise<void> => {
  try {
    const response = await api.delete(`/posts/${id}`);
    console.log("Post deleted successfully:", response.data);
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    console.error("Error deleting post:", axiosError.response?.data || axiosError.message);
    throw axiosError;
  }
};

export const getPosts = async () => {
  try {
    const data: PostsResponse[] = (await apiClient.get("/posts")).data;
    console.log(data);
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

export const likePost = async (postId: string): Promise<void> => {
  try {
    await apiClient.post(`/posts/like/${postId}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to like the post");
  }
};

export const unlikePost = async (postId: string): Promise<void> => {
  try {
    await apiClient.post(`/posts/unlike/${postId}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to like the post");
  }
};
