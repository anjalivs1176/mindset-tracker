import axios from "axios";

// 👇 this sets the base URL from your .env or .env.production file
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 👇 this sends token with each request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
