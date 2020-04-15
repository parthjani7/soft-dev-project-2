import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUsers } from "../../../../actions/userActions";
import { registerUser } from "../../../../actions/courseActions";

class RegisterUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teachers: [],
      students: [],
      guardians: [],
      course_id: this.props.match.params.courseId,
    };
  }
  componentDidMount = () => {
    this.props.getUsers("teacher").then((res) => {
      this.setState({ teachers: res.data });
    });
    this.props.getUsers("student").then((res) => {
      this.setState({ students: res.data });
    });
    this.props.getUsers("guardian").then((res) => {
      this.setState({ guardians: res.data });
    });
  };

  onClickRegister = (userId) => {
    var courseId = this.props.match.params.courseId;
    this.props.registerUser(courseId, userId).then(() => {
      //window.location.reload();

      window.location.href = "/courses/" + this.state.course_id + "/classlist";
    });
  };
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <br />
            <h4>
              <b>List of Teachers</b>
            </h4>
            <br />
            <a
              className="btn btn-success float-right mb-2"
              href="/users/add?type=teacher"
            >
              <i className="fa fa-plus"></i> Add
            </a>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Firstname</th>
                  <th scope="col">Lastname</th>
                  <th scope="col">Email</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.teachers.map((teacher, key) => (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{teacher.firstname}</td>
                    <td>{teacher.lastname}</td>
                    <td>{teacher.email}</td>
                    <td>
                      <button
                        onClick={() => this.onClickRegister(teacher._id)}
                        className="btn btn-primary"
                      >
                        <i className="fa fa-user-plus"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col s12 center-align">
            <br />
            <h4>
              <b>List of Students</b>
            </h4>
            <br />
            <a
              className="btn btn-success float-right mb-2"
              href="/users/add?type=student"
            >
              <i className="fa fa-plus"></i> Add
            </a>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Firstname</th>
                  <th scope="col">Lastname</th>
                  <th scope="col">Email</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.students.map((student, key) => (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{student.firstname}</td>
                    <td>{student.lastname}</td>
                    <td>{student.email}</td>
                    <td>
                      <button
                        onClick={() => this.onClickRegister(student._id)}
                        className="btn btn-primary"
                      >
                        <i className="fa fa-user-plus"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col s12 center-align">
            <br />
            <h4>
              <b>List of Guardians</b>
            </h4>
            <br />
            <a
              className="btn btn-success float-right mb-2"
              href="/users/add?type=guardian"
            >
              <i className="fa fa-plus"></i> Add
            </a>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Firstname</th>
                  <th scope="col">Lastname</th>
                  <th scope="col">Email</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.guardians.map((guardian, key) => (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{guardian.firstname}</td>
                    <td>{guardian.lastname}</td>
                    <td>{guardian.email}</td>
                    <td>
                      <button
                        onClick={() => this.onClickRegister(guardian._id)}
                        className="btn btn-primary"
                      >
                        <i className="fa fa-user-plus"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
RegisterUser.propTypes = {
  getUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { getUsers, registerUser })(
  RegisterUser
);
