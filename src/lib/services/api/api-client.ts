import axios from "axios";
const api = axios.create({
  withCredentials: true,
  baseURL: CHANGEME_API_URL,
});

export default api;
