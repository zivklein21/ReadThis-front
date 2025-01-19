import { AxiosError } from "axios";
import { api } from "./api";

// Utility function to handle Axios errors
export const handleAxiosError = (error: unknown): string => {
  const axiosError = error as AxiosError<{ message?: string }>;
  return axiosError.response?.data.message || axiosError.message || "An unknown error occurred";
};

// Add `accessToken` to all requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh token logic for expired tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && error.config && !error.config._retry) {
      error.config._retry = true;
      try {
        await refreshToken();
        const token = localStorage.getItem("accessToken");
        if (token) {
          error.config.headers.Authorization = `Bearer ${token}`;
        }
        return api.request(error.config);
      } catch (refreshError) {
        console.error("Token refresh failed:", handleAxiosError(refreshError));
        throw refreshError;
      }
    }
    throw error;
  }
);

// Register a new user
export const register = async (username: string, email: string, password: string, profileImage: File) => {
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
    throw new Error(handleAxiosError(error));
  }
};

// Sign in a user
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
    throw new Error(handleAxiosError(error));
  }
};

// Log out a user
export const logout = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  // Clear tokens from localStorage immediately
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userId");

  if (!refreshToken) {
    console.warn("No refresh token found. User already logged out.");
    return;
  }

  try {
    const response = await api.post(
      "/auth/logout",
      { refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("Logout successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Logout error:", handleAxiosError(error));
    throw error;
  }
};

// Refresh the access token
export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  try {
    const { data } = await api.post(
      `/auth/refresh`,
      { refreshToken }, // Send the refresh token in the body
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Update tokens in localStorage
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    return data;
  } catch (error) {
    throw new Error(handleAxiosError(error));
  }
};