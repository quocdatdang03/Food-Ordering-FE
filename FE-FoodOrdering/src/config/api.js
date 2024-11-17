import axios from "axios";

export const BASE_API_URL = "http://localhost:7979/api";

export const axiosAPI = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
