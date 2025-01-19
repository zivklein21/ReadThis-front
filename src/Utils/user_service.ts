import { AxiosError } from "axios";
import {api} from "./api";


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = async (username: string, email: string, password: string, profileImage: File ) => {
  try {
    const formData = new FormData();

    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("image", profileImage);


    const response = await api.post("/auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    console.error("Registration error:", axiosError.response?.data || axiosError.message);
    throw axiosError;
  }
}

export const signIn = async (username: string, password: string) => {
  try {
    const response = await api.post(
      "/auth/login",
      { username, password },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    localStorage.setItem("userId", response.data._id);

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    console.error("Login error:", axiosError.response?.data || axiosError.message);
    throw axiosError;
  }
};

export const logout = async () => {
  try {
    // Retrieve the refreshToken from localStorage
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      throw new Error("No refresh token found. Please log in again.");
    }

    const response = await api.post(
      "/auth/logout",
      { refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Optional if cookies are used
      }
    );

    // Clear tokens from localStorage upon successful logout
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");

    console.log("Logout successful:", response.data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    console.error("Logout error:", axiosError.response?.data || axiosError.message);
    throw axiosError;
  }
};

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  const { data } = await api.get(`/auth/refresh`, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
};