import axios from "axios";

// 👇 this sets the base URL for all your API requests
const API = axios.create({
  baseURL: "http://localhost:5000/api", // local backend
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
