import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types"; // Register User

export const registerUser = userData => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post("/register", userData)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const loginUser = userData => dispatch => {
  axios
    .post("/login", userData)
    .then(res => {
      // Save to localStorage// Set token to localStorage
      const { token, username, type } = res.data;
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("username", username);
      localStorage.setItem("type", type);
      // Set token to Auth header
      setAuthToken(token);
      // Set current user
      dispatch(setCurrentUser({ username, token, type }));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = payload => {
  return {
    type: SET_CURRENT_USER,
    payload: payload
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  console.log("logging out");
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("username");
  localStorage.removeItem("type");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  window.location.href = "/login";
};
