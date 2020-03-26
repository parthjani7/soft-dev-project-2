import axios from "axios";

export const getUsers = () => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get("/users")
      .then(res => resolve(res)) // re-direct to login on successful register
      .catch(err => reject(err));
  });
}; // Login - get user token

export const getUser = id => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/users/${id}`)
      .then(res => resolve(res)) // re-direct to login on successful register
      .catch(err => reject(err));
  });
}; // Login - get user token
