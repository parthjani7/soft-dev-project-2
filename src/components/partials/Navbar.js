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

const StudentHome = lazy(() => import("../pages/Student/Home"));
const TeacherHome = lazy(() => import("../pages/Teacher/Home"));
const GuardianHome = lazy(() => import("../pages/Guardian/Home"));
const AdminHome = lazy(() => import("../pages/Admin/Home"));
const AdminCourse = lazy(() => import("../pages/Admin/Courses/Course"));
const AdminCourseShow = lazy(() => import("../pages/Admin/Courses/Show"));
const Login = lazy(() => import("../pages/Login"));
const Logout = lazy(() => import("../pages/Logout"));
const Signup = lazy(() => import("../pages/Signup"));

export default class Navbar extends React.Component {
  render() {
    const user_type = localStorage.type;
    const token = localStorage.jwtToken;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
          <a className="navbar-brand" href="#">
            Teacher Student Guardian Connector
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
            <ul className="navbar-nav ml-auto">
              {token && (
                <li className="nav-item active">
                  <a className="nav-link" href="/home">
                    Home <span className="sr-only">(current)</span>
                  </a>
                </li>
              )}

              {token === null ? (
                <li className="nav-item active">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
              ) : (
                ""
              )}

              <li className="nav-item active">
                <a className="nav-link" href="/courses">
                  Courses
                </a>
              </li>

              {token && (
                <li className="nav-item active">
                  <a className="nav-link" href="/logout">
                    Logout <span className="sr-only">(current)</span>
                  </a>
                </li>
              )}
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
                {user_type === "admin" && (
                  <Route exact path="/courses" component={AdminCourse} />
                )}
                {user_type === "admin" && (
                  <Route
                    exact
                    path="/courses/:id"
                    component={AdminCourseShow}
                  />
                )}
                <Route exact path="/">
                  <Redirect to="/login" />
                </Route>

                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Logout} />
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
