import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import React, { Suspense, lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "../../store";
import PrivateRoute from "../private-route/PrivateRoute";

const StudentHome = lazy(() => import("../pages/Student/Home"));
const TeacherHome = lazy(() => import("../pages/Teacher/Home"));
const GuardianHome = lazy(() => import("../pages/Guardian/Home"));
const AdminHome = lazy(() => import("../pages/Admin/Home"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));

export default class Navbar extends React.Component {
  render() {
    const user_type = localStorage.type;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/home">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/signup">
                  Signup
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <Provider store={store}>
          <Router>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                {user_type === "student" && (
                  <Route exact path="/home" component={StudentHome} />
                )}
                {user_type === "teacher" && (
                  <Route exact path="/home" component={TeacherHome} />
                )}
                {user_type === "guardian" && (
                  <Route exact path="/home" component={GuardianHome} />
                )}
                {user_type === "admin" && (
                  <Route exact path="/home" component={AdminHome} />
                )}
                <Route exact path="/(|home)/">
                  <Redirect to="/login" />
                </Route>

                <Route exact path="/(|home|login)/" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Switch>
                  {/* <PrivateRoute exact path="/" component={Home} /> */}
                </Switch>
                {/* <Route path="/about" component={About}/> */}
              </Switch>
            </Suspense>
          </Router>
        </Provider>
      </div>
    );
  }
}
