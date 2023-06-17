import axios, { AxiosResponse } from "axios";

const axiosConfig = axios.create({
  baseURL: "https://fluttercommunityvn.vercel.app/api",
  // baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosConfig.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});
axiosConfig.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export default axiosConfig;
