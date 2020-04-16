import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/partials/Navbar";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import store from "./store";
import axios from "axios";
// import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  const username = localStorage.username;
  const type = localStorage.type;

  setAuthToken(token);
  // Decode token and get user info and exp
  // const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser({ username, token, type }));
  // Check for expired token
  // const currentTime = Date.now() / 1000; // to get in milliseconds
  // if (decoded.exp < currentTime) {
  //   // Logout user
  //   store.dispatch(logoutUser()); // Redirect to login
  //   window.location.href = "./login";
  // }
}

axios.defaults.baseURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api/v1"
    : "/api/v1";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
      </div>
    );
  }
}
export default App;
