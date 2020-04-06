import axios from "axios";

export const addCourse = data => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post("/courses", data)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const getCourses = () => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get("/courses")
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const getCourse = id => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/courses/${id}`)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

//Added by Sruthi

export const getClassList = id => dispatch => {
  return new Promise((resolve, reject) => {
    axios
    .get(`/classlist/${id}`)
    .then(res => resolve(res))
    .catch(err => reject(err));
  });
};

export const registerUser = (courseId, userId) => dispatch => {
  return new Promise((resolve, reject) => {
    axios
    .get(`/courses/${courseId}/${userId}`)
    .then(res => resolve(res))
    .catch(err => reject(err));
  });
}

export const dropUser = (courseId, userId) => dispatch => {
  return new Promise((resolve, reject) => {
    axios
    .delete(`/courses/${courseId}/${userId}`)
    .then(res => resolve(res))
    .catch(err => reject(err));
  });
}
//Ends here