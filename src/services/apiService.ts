import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.openai.com/v1",
});

apiClient.interceptors.request.use((config) => {
  config.headers?.set(
    "Authorization",
    `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
  );
  config.headers?.set("Content-Type", "application/json");
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
