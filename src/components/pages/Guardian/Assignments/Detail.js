import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getAssignment,
  getSubmissions,
  getNonSubmissions,
  checkSubmission
} from "../../../../actions/assignmentActions";
import {getWardInformation} from "../../../../actions/userActions";

class Submissions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assignment_id: null,
      assignment: {},
      studentUsername: null,
      status: 'Not submitted',
      temp: 'no value'
    };
  }
  componentDidMount = () => {
    const { id } = this.props.match.params.id;
    var username;

    this.setState({ assignment_id: id });

    this.props.getAssignment(this.props.match.params.id).then(res => {
      this.setState({ assignment: res.data });
    });

    this.props.getWardInformation(localStorage.username).then(res => {
        this.setState({ studentUsername: res.data.username});
        username = res.data.username;
        
        this.props.checkSubmission(this.props.match.params.id, res.data.username).then(response => {
        this.setState({ status: response.data});
        });
    });      
  };

  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <br />
                <h4>
                  <b>Assignment Name: {this.state.assignment.name}</b><hr/>
                </h4>
                <div class="jumbotron">
                  <h5>
                    <b>Assignment Description:</b> {this.state.assignment.description}
                  </h5>
                  <h5>
                    <b>Due date:</b> {new Date(this.state.assignment.due).toDateString()}
                  </h5>                 
                  <h5>
                    <b>Status:</b> {this.state.status}
                  </h5>
                </div>

            
          </div>
        </div>
    </div>
    
    );
  }
}

Submissions.propTypes = {
  getAssignment: PropTypes.func.isRequired,
  getSubmissions: PropTypes.func.isRequired,
  getNonSubmissions: PropTypes.func.isRequired,
  getWardInformation: PropTypes.func.isRequired,
  checkSubmission: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { getAssignment, getSubmissions, getNonSubmissions, getWardInformation, checkSubmission})(
  Submissions
);
