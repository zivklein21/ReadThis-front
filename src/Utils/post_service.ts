import api from "./api";
import { PostProps } from "../components/HomePage/Posts/Post";

interface PostsResponse {
  _id: string;
  content: string;
  title: string;
  owner: {
    _id: "";
    username: "";
    image: "";
  };
  usersWhoLiked: [];
  comments: {
    _id: string;
    user: {
      _id: string;
      username: string;
      image: string;
    };
    text: string;
  }[];
}

const DEFAULT_POST: PostProps = {
  _id: "default",
  title: "",
  content: "",
  usersWhoLiked: [],
  owner: {
    _id: "",
    username: "",
    image: "",
  },
  comments: [],
};

// Create a new post
export const createPost = async (formData: FormData) => {
  const response = await api.post(`/posts`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const likePost = async (postId: string): Promise<void> => {
  try {
    await api.post(`/posts/like/${postId}`); // ניסיון לעשות לייק
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.log("Token expired. Refreshing...");
      try {
        const refreshResponse = await api.post(`/auth/refresh`, {
          refreshToken: localStorage.getItem("refreshToken"),
        });

        // עדכון האסימונים החדשים
        localStorage.setItem("accessToken", refreshResponse.data.accessToken);
        localStorage.setItem("refreshToken", refreshResponse.data.refreshToken);

        // ניסיון חוזר לעשות לייק
        await api.post(`/posts/like/${postId}`);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        // הפניה להתחברות מחדש במקרה של כשל
      }
    } else {
      console.error("Failed to like post:", error);
    }
  }
};

// Unlike a post
export const unlikePost = async (postId: string): Promise<void> => {
  const response = await api.post(`/posts/${postId}/unlike`, null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include the access token for authorization
    },
  });

  return response.data;
};

// Fetch all posts
export const getAllPosts = async () => {
  try {
    const data: PostsResponse[] = (await api.get("/posts")).data;
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

// Fetch a post by ID
export const getPostById = async (postId: string): Promise<void> => {
  const response = await api.get(`/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include the access token for authorization
    },
  });

  return response.data;
};
