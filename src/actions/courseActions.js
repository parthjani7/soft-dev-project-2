import axios from "axios";

export const getCourses = () => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get("/courses")
      .then(res => resolve(res)) // re-direct to login on successful register
      .catch(err => reject(err));
  });
}; // Login - get user token

export const getCourse = id => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/courses/${id}`)
      .then(res => resolve(res)) // re-direct to login on successful register
      .catch(err => reject(err));
  });
}; // Login - get user token
