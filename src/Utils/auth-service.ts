import axios, { AxiosError } from "axios";

const API_URL = "http://localhost:3000/auth/login";

export const signIn = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      API_URL,
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