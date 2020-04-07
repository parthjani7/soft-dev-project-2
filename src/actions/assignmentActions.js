import axios from "axios";

export const addAssignment = (id, data) => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/courses/${id}/assignments`, data)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const getAssignments = id => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/courses/${id}/assignments`)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const getAssignment = id => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/assignments/${id}`)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const updateAssignment = (id, body) => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .put(`/assignments/${id}`, body)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const deleteAssignment = id => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/assignments/${id}`)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const getAllAssignments = () => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/assignments`)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const getSubmissions = id => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/assignments/${id}/submissions`)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const getNonSubmissions = id => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/assignments/${id}/nonsubmissions`)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};