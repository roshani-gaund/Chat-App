import axios from "axios";

const API = axios.create({
  baseURL:import.meta.env.MODE==="development"? " https://chat-app-pif3.onrender.com":"http://localhost:5001/api",
  withCredentials: true,
});
export const BASE_URL = " https://chat-app-pif3.onrender.com";

export default API;
