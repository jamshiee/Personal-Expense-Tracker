import axios from "axios";

// https://personal-expense-tracker-backend-h9m5.onrender.com
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5050/api', 
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;