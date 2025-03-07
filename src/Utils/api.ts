import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/",
});

// Add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken"); // Adjust based on your storage mechanism
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
