import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import React, { Suspense, lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "../../store";

const EditUser = lazy(() => import("../pages/Admin/Edit"));

const StudentHome = lazy(() => import("../pages/Student/Home"));
const StudentCourseShow = lazy(() => import("../pages/Student/Courses/Show"));
const StudentAssignments = lazy(() => import("../pages/Student/Assignment"));
const StudentAssignmentDetails = lazy(() => import("../pages/Student/Detail"));

const TeacherHome = lazy(() => import("../pages/Teacher/Home"));
const TeacherCourse = lazy(() => import("../pages/Teacher/Courses/Course"));
const TeacherCourseShow = lazy(() => import("../pages/Teacher/Courses/Show"));
const TeacherClasslist = lazy(() =>
  import("../pages/Teacher/Courses/Classlist")
);
const AssignmentSubmissions = lazy(() =>
  import("../pages/Admin/Assignments/Submissions")
);

const GuardianHome = lazy(() => import("../pages/Guardian/Home"));
const GuardianCourse = lazy(() => import("../pages/Guardian/Courses/Course"));
const GuardianAssignmentDetails = lazy(() =>
  import("../pages/Guardian/Assignments/Detail")
);

const AdminHome = lazy(() => import("../pages/Admin/Home"));
const AdminCourse = lazy(() => import("../pages/Admin/Courses/Course"));
const AdminAddCourse = lazy(() => import("../pages/Admin/Courses/Add"));
const AdminCourseShow = lazy(() => import("../pages/Admin/Courses/Show"));
const AdminClasslist = lazy(() => import("../pages/Admin/Courses/Classlist"));
const AdminCourseRegisterUser = lazy(() =>
  import("../pages/Admin/Courses/RegisterUser")
);
const AdminUsers = lazy(() => import("../pages/Admin/Users/User"));
const AdminAddUsers = lazy(() => import("../pages/Admin/Users/Add"));
const AdminEditUser = lazy(() => import("../pages/Admin/Users/Edit"));
const AdminAssignments = lazy(() =>
  import("../pages/Admin/Assignments/Assignment")
);
const AdminAllAssignments = lazy(() =>
  import("../pages/Admin/Assignments/AllAssignments")
);
const AdminAddAssignments = lazy(() =>
  import("../pages/Admin/Assignments/Add")
);
const AdminEditAssignment = lazy(() =>
  import("../pages/Admin/Assignments/Edit")
);
const Login = lazy(() => import("../pages/Login"));
const Logout = lazy(() => import("../pages/Logout"));
const Signup = lazy(() => import("../pages/Admin/Users/Add"));

export default class Navbar extends React.Component {
  render() {
    const user_type = localStorage.type;
    const token = localStorage.jwtToken;
    const user_name = localStorage.username;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
          <a className="navbar-brand" href="/home">
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

              {token && (
                <li className="nav-item active">
                  <a className="nav-link" href="/courses">
                    Courses
                  </a>
                </li>
              )}

              {user_type === "admin" ? (
                <li className="nav-item active">
                  <a className="nav-link" id="nav_users" href="/users">
                    Users
                  </a>
                </li>
              ) : (
                ""
              )}

              {token && (
                <li className="nav-item active">
                  <a className="nav-link" href="/users/edit">
                    My Account
                  </a>
                </li>
              )}

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
                  <Route exact path="/home" component={TeacherCourse} />
                )}
                {user_type === "student" && (
                  <Route exact path="/courses" component={TeacherCourse} />
                )}
                {(user_type === "student" || user_type === "guardian") && (
                  <Route
                    exact
                    path="/courses/:id"
                    component={StudentCourseShow}
                  />
                )}
                {(user_type === "student" || user_type === "guardian") && (
                  <Route
                    exact
                    path="/courses/:id/classlist"
                    component={TeacherClasslist}
                  />
                )}
                {(user_type === "student" || user_type === "guardian") && (
                  <Route
                    exact
                    path="/courses/:id/assignments"
                    component={StudentAssignments}
                  />
                )}
                {user_type === "guardian" && (
                  <Route exact path="/home" component={GuardianCourse} />
                )}
                {user_type === "guardian" && (
                  <Route exact path="/courses" component={GuardianCourse} />
                )}
                {user_type === "guardian" && (
                  <Route
                    exact
                    path="/assignments/:id/details"
                    component={GuardianAssignmentDetails}
                  />
                )}
                {user_type === "student" && (
                  <Route
                    exact
                    path="/assignments/:id/details"
                    component={StudentAssignmentDetails}
                  />
                )}
                {user_type === "teacher" && (
                  <Route exact path="/home" component={TeacherCourse} />
                )}
                {user_type === "teacher" && (
                  <Route exact path="/courses" component={TeacherCourse} />
                )}
                {user_type === "teacher" && (
                  <Route
                    exact
                    path="/courses/:id"
                    component={TeacherCourseShow}
                  />
                )}
                {user_type === "teacher" && (
                  <Route
                    exact
                    path="/courses/:id/classlist"
                    component={TeacherClasslist}
                  />
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
                  <Route exact path="/courses/add" component={AdminAddCourse} />
                )}
                {user_type === "admin" && (
                  <Route
                    exact
                    path="/assignments"
                    component={AdminAllAssignments}
                  />
                )}
                {(user_type === "admin" || user_type === "teacher") && (
                  <Route
                    exact
                    path="/assignments/:id/submissions"
                    component={AssignmentSubmissions}
                  />
                )}
                {user_type === "admin" && (
                  <Route
                    exact
                    path="/courses/:id"
                    component={AdminCourseShow}
                  />
                )}
                {
                  //Added by Sruthi
                  user_type === "admin" && (
                    <Route
                      exact
                      path="/courses/:id/classlist"
                      component={AdminClasslist}
                    />
                  )
                }

                {user_type === "admin" && (
                  <Route
                    exact
                    path="/courses/:courseId/register"
                    component={AdminCourseRegisterUser}
                  />
                )}
                {user_type === "admin" && (
                  <Route exact path="/users" component={AdminUsers} />
                )}
                {user_type === "admin" && (
                  <Route exact path="/users/add" component={AdminAddUsers} />
                )}
                {user_type === "admin" && (
                  <Route
                    exact
                    path="/users/:id/edit"
                    component={AdminEditUser}
                  />
                )}
                {(user_type === "admin" || user_type === "teacher") && (
                  <Route
                    exact
                    path="/courses/:id/assignments"
                    component={AdminAssignments}
                  />
                )}
                {(user_type === "admin" || user_type === "teacher") && (
                  <Route
                    exact
                    path="/courses/:id/assignments/add"
                    component={AdminAddAssignments}
                  />
                )}
                {(user_type === "admin" || user_type === "teacher") && (
                  <Route
                    exact
                    path="/courses/:id/assignments/:edit"
                    component={AdminEditAssignment}
                  />
                )}
                <Route exact path="/">
                  <Redirect to="/login" />
                </Route>

                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/users/edit" component={EditUser} />

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
