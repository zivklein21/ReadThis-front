import api from "./api";
import { PostProps } from "../components/HomePage/Posts/Post";
import { SERVER_URL } from "./vars";

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
  if (!formData.get("image")) {
    formData.delete("image"); // Ensure image field is removed if not provided
  }
  const response = await api.post(`/posts`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const likePost = async (postId: string): Promise<void> => {
  try {
    await api.post(`/posts/like/${postId}`);
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.log("Token expired. Refreshing...");
      try {
        const refreshResponse = await api.post(`/auth/refresh`, {
          refreshToken: localStorage.getItem("refreshToken"),
        });

        localStorage.setItem("accessToken", refreshResponse.data.accessToken);
        localStorage.setItem("refreshToken", refreshResponse.data.refreshToken);

        await api.post(`/posts/like/${postId}`);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
      }
    } else {
      console.error("Failed to like post:", error);
    }
  }
};

// Unlike a post
export const unlikePost = async (postId: string): Promise<void> => {
  const response = await api.post(`/posts/unlike/${postId}`);
  return response.data;
};

export const getAllPosts = async (page = 1, limit = 5) => {
  try {
    const response = await api.get(
      `/posts/paged?page=${page}&limit=${limit}&sort=-createdAt`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch posts from the server."
    );
  }
};

// Fetch a post by ID
export const getPostById = async (postId: string): Promise<void> => {
  const response = await api.get(`/posts/${postId}`);

  return response.data;
};

export const addComment = async (
  postId: string,
  text: string
): Promise<PostsResponse> => {
  const data = (await api.post(`/posts/comment/${postId}`, { text })).data;

  console.log(data);

  return {
    ...DEFAULT_POST,
    ...data,
    imagePath: data.image,
    id: data._id,
    owner: data.owner || DEFAULT_POST.owner, // Add null check here
  };
};

export const getMyPosts = async () => {
  try {
    const data: PostsResponse[] = (await api.get("/posts/my-posts")).data;
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

export const updatePost = async (postId: string, formData: FormData) => {
  const res = await api.put(`/posts/${postId}`, formData);
  return res.data;
};

export const deletePost = async (postId: string) => {
  await api.delete(`/posts/${postId}`);
};
