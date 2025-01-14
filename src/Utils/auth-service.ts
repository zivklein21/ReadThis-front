import axios, { AxiosError } from "axios";

const API_URL = "http://localhost:3000/auth/login";

export const signIn = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      API_URL,
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // Ensures cookies and authentication headers are sent
      }
    );

    // Store token in localStorage for future authenticated requests
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);

    return response.data;
  } catch (error) {
    // Properly type error as AxiosError
    const axiosError = error as AxiosError<{ message?: string }>;

    console.error("Login error:", axiosError.response?.data || axiosError.message);

    throw axiosError;
  }
};