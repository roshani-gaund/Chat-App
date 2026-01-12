import axios from "axios";

const API = axios.create({
  baseURL:" https://chat-app-pif3.onrender.com",
  withCredentials: true,
});
export const BASE_URL = " https://chat-app-pif3.onrender.com";

export default API;
