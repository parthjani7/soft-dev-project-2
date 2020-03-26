import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 1000,
  headers: {
    Authorization: localStorage.getItem("token")
      ? `Bearer ${localStorage.getItem("token")}`
      : ""
  }
});

export default instance;
