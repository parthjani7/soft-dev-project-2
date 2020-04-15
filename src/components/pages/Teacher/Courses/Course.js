import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCourses } from "../../../../actions/courseActions";
import { getCourseList } from "../../../../actions/userActions";

class Course extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: [],
      users: []
    };
  }
  componentDidMount = () => {
    this.props.getCourseList(localStorage.username).then(res => {
        this.setState({courses: res.data})
    });
  };

  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <br />
            <h4>Hey {localStorage.username}!</h4>
            <hr/>
            <div className="row">
              
              <div className="col-md-6">
                <h4>
                  <b>Your Courses:</b>
                </h4>
              </div>
              <div className="col-md-6 text-right">
              </div>
            </div>
            <hr />
            {this.state.courses.map((course, key) => (
              <div
                className="card float-left mr-3 my-3"
                style={{ width: "21rem", height: "8rem" }}
                key={key}
              >
                <div className="card-body">
                  <h5 className="card-title">
                    <a href={"/courses/" + course._id}> {course.name}</a>
                  </h5>
                  <p className="card-text">Course Code: {course.code}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
Course.propTypes = {
  getCourses: PropTypes.func.isRequired,
  getCourseList: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { getCourses, getCourseList })(Course);
