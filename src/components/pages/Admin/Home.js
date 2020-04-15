import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";

class Home extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  componentDidMount = (e) => {
    console.log(this.props.auth);
    if (!this.props.auth.isAuthenticated) {
      this.props.logoutUser();
      this.props.history.push("/login");
    }
  };
  render() {
    const { user } = this.props.auth;
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row" style={{ paddingTop: "10%" }}>
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="col s12 center-align">
              <h4>
                <b>Hey {user.username},</b>
              </h4>

              <div
                className="list-group"
                style={{ paddingLeft: "5%", paddingTop: "5%" }}
              >
                <a
                  href="/courses"
                  className="list-group-item list-group-item-dark list-group-item-action"
                >
                  View all Courses
                </a>
                <a
                  href="/users"
                  className="list-group-item list-group-item-light list-group-item-action"
                >
                  View all Users
                </a>
                <a
                  href="/assignments"
                  className="list-group-item list-group-item-dark list-group-item-action"
                >
                  View all Assignments
                </a>
                <a
                  href="courses/add"
                  className="list-group-item list-group-item-light list-group-item-action"
                >
                  Add new Course
                </a>
                <a
                  href="users/add"
                  className="list-group-item list-group-item-dark list-group-item-action"
                >
                  Add new User
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    );
  }
}
Home.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Home);
