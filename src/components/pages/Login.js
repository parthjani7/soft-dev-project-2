import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import "bootstrap/dist/css/bootstrap.min.css";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      setTimeout(() => {
        window.location.href = "/home";
      }, 200);
    }
  }

  onChangeEmail = (e) => this.setState({ email: e.target.value });

  onChangePassword = (e) => this.setState({ password: e.target.value });

  UNSAFE_componentWillReceiveProps(nextProps, prevState) {
    if (nextProps.auth.isAuthenticated) {
      window.location.href = "/home"; // push user to dashboard when they login
    }
    return null;
    // if (nextProps.errors) {
    //   return {
    //     errors: nextProps.errors
    //   };
    // }
  }

  checkLogin = (e) => {
    e.preventDefault();
    this.props.loginUser(this.state);
  };

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
                      autoFocus
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
                  <button type="submit" id="submit" className="btn btn-primary">
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(Login);
