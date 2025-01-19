import api from "./api";
import { SERVER_URL } from "./vars";


// Interfaces for API responses
export interface IPost {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  owner: string;
  usersWhoLiked: string[];
  comments?: {
    _id: string;
    user: { _id: string; name: string; image: string };
    text: string;
  }[];
}

export interface ICreatePostRequest {
  title: string;
  content: string;
  owner: string;
  image: File;
}

// Create a new post
export const createPost = async (formData: FormData) => {
  const response = await api.post(`${SERVER_URL}/posts`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const likePost = async (postId: string): Promise<void> => {
  try {
    await api.post(`${SERVER_URL}/posts/like/${postId}`); // ניסיון לעשות לייק
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.log("Token expired. Refreshing...");
      try {
        const refreshResponse = await api.post(`${SERVER_URL}/auth/refresh`, {
          refreshToken: localStorage.getItem("refreshToken"),
        });

        // עדכון האסימונים החדשים
        localStorage.setItem("accessToken", refreshResponse.data.accessToken);
        localStorage.setItem("refreshToken", refreshResponse.data.refreshToken);

        // ניסיון חוזר לעשות לייק
        await api.post(`${SERVER_URL}/posts/like/${postId}`);
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
export const unlikePost = async (postId: string): Promise<IPost> => {
  const response = await api.post<IPost>(`${SERVER_URL}/posts/${postId}/unlike`, null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include the access token for authorization
    },
  });

  return response.data;
};

// Fetch all posts
export const fetchAllPosts = async (): Promise<IPost[]> => {
  const response = await api.get<IPost[]>(`${SERVER_URL}/posts`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include the access token for authorization
    },
  });

  return response.data;
};

// Fetch a post by ID
export const fetchPostById = async (postId: string): Promise<IPost> => {
  const response = await api.get<IPost>(`${SERVER_URL}/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include the access token for authorization
    },
  });

  return response.data;
};