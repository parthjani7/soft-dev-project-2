import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import "bootstrap/dist/css/bootstrap.min.css";

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      type: "",
      email: "",
      password: ""
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => this.setState({ [e.target.id]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-md-8 offset-2">
            <div class="card">
              <div class="card-header">
                <strong>Create a new user!</strong>
              </div>
              <div class="card-body">
                <form>
                  <div className="form-group">
                    <label for="Firstname">Firstname</label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.firstname}
                      placeholder="Enter your Firstname"
                      id="Firstname"
                    />
                  </div>
                  <div className="form-group">
                    <label for="Lastname">Lastname</label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.lastname}
                      placeholder="Enter your Lastname"
                      id="Lastname"
                    />
                  </div>
                  <div className="form-group">
                    <label for="Username">Username</label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.username}
                      placeholder="Enter your Username"
                      id="Username"
                    />
                  </div>
                  <div className="form-group">
                    <label for="UserType">User Type</label>
                    <select
                      required
                      type="text"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.type}
                      placeholder="Enter your UserType"
                      id="UserType"
                    >
                      <option value="">Select User Type</option>
                      <option value="teacher">Teacher</option>
                      <option value="guardian">Guardian</option>
                      <option value="student">Student</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label for="Email">Email address</label>
                    <input
                      required
                      type="email"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.email}
                      placeholder="Enter your e-mail address"
                      id="Email"
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                  <div className="form-group">
                    <label for="Password">Password</label>
                    <input
                      required
                      type="password"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.password}
                      placeholder="Enter your password"
                      id="Password"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Signup));
