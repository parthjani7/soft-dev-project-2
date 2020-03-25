import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.checkLogin = this.checkLogin.bind(this);

    this.state = {
      email: "",
      password: ""
    };
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }
  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  checkLogin(e) {
    e.preventDefault();

    const loginObj = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post("http://localhost:3000/login", loginObj)
      .then(res => {
        console.log(res);
      })
      .catch(err => {});
  }

  render() {
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-md-8 offset-2">
            <div className="card">
              <div className="card-header">
                <strong>Login Here!</strong>
              </div>
              <div className="card-body">
                <form onSubmit={this.checkLogin}>
                  <div className="form-group">
                    <label htmlFor="Email">Email address</label>
                    <input
                      required
                      type="email"
                      onChange={this.onChangeEmail}
                      value={this.state.email}
                      className="form-control"
                      placeholder="Enter your e-mail address"
                      id="email"
                      aria-describedby="emailHelp"
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Password">Password</label>
                    <input
                      required
                      onChange={this.onChangePassword}
                      value={this.state.password}
                      type="password"
                      className="form-control"
                      placeholder="Enter your password"
                      id="password"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={this.checkLogin}
                    className="btn btn-primary"
                  >
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
