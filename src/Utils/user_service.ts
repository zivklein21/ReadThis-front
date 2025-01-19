import {api} from "./api";
import {SERVER_URL} from "./vars";


// Interfaces for API responses
interface IUser {
  _id: string;
  username: string;
  email: string;
  imageUrl: string;
  refreshToken?: string[];
}

interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  _id: string;
}

// Register a new user
export const registerUser = async (formData: FormData): Promise<IUser> => {
  const response = await api.post<IUser>(`${SERVER_URL}/auth/register`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Login a user
export const loginUser = async (username: string, password: string): Promise<IAuthResponse> => {
  const response = await api.post<IAuthResponse>(`${SERVER_URL}/auth/login`, {
    username,
    password,
  });
  // Save tokens in localStorage
  saveTokens(response.data.accessToken, response.data.refreshToken);
  return response.data;
};

// Logout a user
export const logoutUser = async (refreshToken: string): Promise<void> => {
  await api.post(`${SERVER_URL}/auth/logout`, { refreshToken });
  clearTokens(); // Clear tokens from localStorage
};

// Refresh tokens
export const refreshTokens = async (): Promise<void> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token found");

  const response = await api.post(`${SERVER_URL}/auth/refresh`, { refreshToken });
  const { accessToken, refreshToken: newRefreshToken } = response.data;

  // Save new tokens
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", newRefreshToken);
};

// Token Management Utilities
export const saveTokens = (accessToken: string, refreshToken: string): void => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const clearTokens = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};