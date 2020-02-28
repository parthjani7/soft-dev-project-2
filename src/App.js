import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = lazy(() => import("./components/home"));
const Login = lazy(() => import("./components/login"));
const Signup = lazy(() => import("./components/signup"));
const Navbar = lazy(() => import("./components/partials/navbar"));
// import "./App.css";

function App() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          Navbar
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/home">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="/login">
                Login
              </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/signup">
                Signup
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            {/* <Route path="/about" component={About}/> */}
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
