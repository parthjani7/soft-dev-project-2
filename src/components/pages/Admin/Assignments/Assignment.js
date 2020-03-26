import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAssignments } from "../../../../actions/assignmentActions";

class Assignment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      course_id: null,
      assignments: []
    };
  }
  componentDidMount = () => {
    // const { id } = this.props.match.params;

    // this.setState({ course_id: id });

    this.props.getAssignments(this.props.match.params.id).then(res => {
      this.setState({ assignments: res.data });
    });
  };

  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <br />
            <h4>
              <b>List of Assignments</b>
            </h4>
            <br />
            {this.state.assignments.map((assignment, key) => (
              <div
                className="card float-left mr-5"
                style={{ width: "18rem" }}
                key={key}
              >
                <div className="card-body">
                  <h5 className="card-title">
                    <a href={"/assignments/" + assignment._id}>
                      {assignment.name}
                    </a>
                  </h5>
                  <p className="card-text">
                    <strong>Description:</strong> {assignment.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
Assignment.propTypes = {
  getAssignments: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { getAssignments })(Assignment);
