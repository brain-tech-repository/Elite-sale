// utils/api.ts
import axios from "axios";
import { CookieManager } from "./cookieUtils";


const api = axios.create({
  baseURL: "/api", // your backend URL
  withCredentials: true, // send cookies automatically
});

// Attach token to Authorization header automatically
api.interceptors.request.use(config => {
  const token = CookieManager.get("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;