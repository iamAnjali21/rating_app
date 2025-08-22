// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/", // backend base URL
});


export const fetchUsers = () => API.get("/admin/users");
export const addUser = (data) => API.post("/admin/users", data);
export const fetchStores = () => API.get("/admin/stores");
export const addStore = (data) => API.post("/admin/stores", data);



export const fetchRatings = () => API.get("/ratings");


// Send token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
