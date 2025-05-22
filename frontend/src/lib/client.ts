import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const token = localStorage.getItem("token");
if (token) {
  client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
export default client;
