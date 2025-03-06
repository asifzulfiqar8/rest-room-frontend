import axios from "axios";
import { toast } from "react-toastify";

// const AuthAPI = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

const AuthAPI = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5000", // Ensure this points to your backend
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const callAuth = async (
  url,
  method = "GET",
  payload = {},
  params = {}
) => {
  try {
    console.log("url and method", url, method);
    const res = await AuthAPI({
      url,
      method,
      data: payload,
      params,
    });

    return res.data;
  } catch (error) {
    console.error("Error response:", error);
    const errorMsg = error?.response?.data?.message;

    if (errorMsg) {
      toast.error(errorMsg);
    } else {
      toast.error("Unknown error occurred.");
    }

    throw new Error(errorMsg);
  }
};
