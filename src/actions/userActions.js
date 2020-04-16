import axios from "axios";

export const getUsers = (type = "") => dispatch => {
  return new Promise((resolve, reject) => {
    const url = type === "" ? `/users` : `/users?type=${type}`;
    axios
      .get(`${url}`)
      .then(res => resolve(res)) // re-direct to login on successful register
      .catch(err => reject(err));
  });
};

export const getUser = id => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/users/${id}`)
      .then(res => resolve(res)) // re-direct to login on successful register
      .catch(err => reject(err));
  });
};

export const updateUser = (id, body) => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .put(`/users/${id}`, body)
      .then(res => resolve(res)) // re-direct to login on successful register
      .catch(err => reject(err));
  });
};

export const deleteUser = id => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/users/${id}`)
      .then(res => resolve(res)) // re-direct to login on successful register
      .catch(err => reject(err));
  });
};

//Added by Sruthi
export const getCourseList = username => dispatch => {
  return new Promise((resolve, reject) => {
    axios
    .get(`/courselist/${username}`)
    .then(res => resolve(res))
    .catch(err => reject(err));
  });
};

export const getStudentCourseList = username => dispatch => {
  return new Promise((resolve, reject) => {
    axios
    .get(`/studentcourselist/${username}`)
    .then(res => resolve(res))
    .catch(err => reject(err));
  });
};

export const getWardInformation = username => dispatch => {
  return new Promise((resolve, reject) => {
    axios
    .get(`/getstudent/${username}`)
    .then(res => resolve(res))
    .catch(err => reject(err));
  });
};
