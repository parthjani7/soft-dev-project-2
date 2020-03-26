import axios from "axios";
const setAuthToken = token => {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};
export default setAuthToken;

// const instance = token =>
//   axios.create({
//     baseURL: "http://localhost:3000/",
//     timeout: 1000,
//     headers: {
//       Authorization: token ? `Bearer ${token}` : ""
//     }
//   });

// export default instance;
