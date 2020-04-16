import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUsers, deleteUser } from "../../../../actions/userActions";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teachers: [],
      students: [],
      guardians: [],
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

  onClickDelete = (id) => {
    this.props.deleteUser(id).then(() => {
      window.location.reload();
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
              id="add_teacher_btn"
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
                      <a
                        href={"users/" + teacher._id + "/edit"}
                        className="btn btn-primary"
                      >
                        <i className="fa fa-pencil"></i>
                      </a>
                      <button
                        onClick={() => this.onClickDelete(teacher._id)}
                        className="btn btn-danger ml-1"
                      >
                        <i className="fa fa-trash"></i>
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
              id="add_student_btn"
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
                      <a
                        href={"users/" + student._id + "/edit"}
                        className="btn btn-primary"
                      >
                        <i className="fa fa-pencil"></i>
                      </a>
                      <button
                        onClick={() => this.onClickDelete(student._id)}
                        className="btn btn-danger ml-1"
                      >
                        <i className="fa fa-trash"></i>
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
              id="add_guardian_btn"
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
                      <a
                        href={"users/" + guardian._id + "/edit"}
                        className="btn btn-primary"
                      >
                        <i className="fa fa-pencil"></i>
                      </a>
                      <button
                        onClick={() => this.onClickDelete(guardian._id)}
                        className="btn btn-danger ml-1"
                      >
                        <i className="fa fa-trash"></i>
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
User.propTypes = {
  getUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { getUsers, deleteUser })(User);
