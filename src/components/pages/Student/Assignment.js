import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getAssignments,
  deleteAssignment
} from "../../../actions/assignmentActions";

class Assignment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      course_id: null,
      assignments: []
    };
  }
  componentDidMount = () => {
    const { id } = this.props.match.params;

    this.setState({ course_id: id });

    this.props.getAssignments(this.props.match.params.id).then(res => {
      this.setState({ assignments: res.data });
    });
  };

  onClickDelete = id => {
    this.props.deleteAssignment(id).then(() => {
      window.location.reload();
    });
  };

  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <br />
            <div className="row">
              <div className="col-md-6">
                <h4>
                  <b>List of Assignments</b>
                </h4>
              </div>
              <div className="col-md-6 text-right">
              </div>
            </div>

            <hr />
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Due</th>
                </tr>
              </thead>
              <tbody>
                {this.state.assignments.map((assignment, key) => (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>
                      {/* <a href={"/assignments/" + assignment._id}> */}
                      {assignment.name}
                      {/* </a> */}
                    </td>
                    <td>{assignment.description}</td>
                    <td>{new Date(assignment.due).toDateString()}</td>
                    
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
Assignment.propTypes = {
  getAssignments: PropTypes.func.isRequired,
  deleteAssignment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { getAssignments, deleteAssignment })(
  Assignment
);
