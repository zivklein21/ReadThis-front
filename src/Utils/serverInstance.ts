// src/utils/axiosInstance.ts

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // or your server's base URL
});

export default axiosInstance;