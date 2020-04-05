import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getAllAssignments
} from "../../../../actions/assignmentActions";

class AllAssignments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assignments: []
    };
  }
  componentDidMount = () => {
    this.props.getAllAssignments().then(res => {
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
                <a
                  href={`/courses/${this.props.match.params.id}/assignments/add`}
                  className="btn btn-primary"
                >
                  <i className="fa fa-plus"></i> Add
                </a>
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
                  <th scope="col">Actions</th>
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
                    <td>
                      {/* <a
                        href={"users/" + assignment._id + "/edit"}
                        className="btn btn-primary"
                      >
                        <i className="fa fa-pencil"></i>
                      </a> */}
                      <button
                        onClick={() => this.onClickDelete(assignment._id)}
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

AllAssignments.propTypes = {
  getAllAssignments: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { getAllAssignments})(
  AllAssignments
);
