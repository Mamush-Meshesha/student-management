
import axios from "axios";

const api = axios.create({
  baseURL: "https://student-management-janl.onrender.com/api",
});

api.interceptors.request.use(
  (config) => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
