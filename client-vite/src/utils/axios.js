// src/utils/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // or your deployed Render URL
});

export default instance;
