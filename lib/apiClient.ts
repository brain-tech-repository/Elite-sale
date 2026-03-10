// utils/api.ts

import axios from "axios";
import { CookieManager } from "./cookieUtils";

const api = axios.create({
   baseURL: "/backend",   // ✅ MUST be this
  // baseURL: process.env.NEXT_PUBLIC_API_URL, // ✅ from env
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = CookieManager.get("token");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;