import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Signup extends React.Component {
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
