import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Login extends React.Component {
  render() {
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-md-8 offset-2">
            <div class="card">
              <div class="card-header">
                <strong>Login Here!</strong>
              </div>
              <div class="card-body">
                <form>
                  <div className="form-group">
                    <label for="Email">Email address</label>
                    <input
                      required
                      type="email"
                      className="form-control"
                      placeholder="Enter your e-mail address"
                      id="Email"
                      aria-describedby="emailHelp"
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
