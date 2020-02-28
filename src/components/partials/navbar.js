import { Route } from "react-router-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Route exact path="/" className="navbar-brand">
          Navbar
        </Route>
      </nav>
    );
  }
}
