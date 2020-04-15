import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCourse } from "../../../../actions/courseActions";

class Course extends Component {
  constructor(props) {
    super(props);

    this.state = {
      course_id: null,
      course: null,
    };
  }
  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.setState({ course_id: id });

    this.props.getCourse(id).then((res) => {
      this.setState({ course: res.data });
    });
  };

  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <br />
            {this.state.course && (
              <h4>
                <b>Selected Course : {this.state.course.name}</b>
              </h4>
            )}
            <hr />
            <ul class="list-group">
              <li class="list-group-item">
                <a href={"/courses/" + this.state.course_id + "/classlist"}>
                  View Classlist
                </a>
              </li>
              <li class="list-group-item">
                <a href={"/courses/" + this.state.course_id + "/assignments"}>
                  {" "}
                  View Assignments
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
Course.propTypes = {
  getCourse: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { getCourse })(Course);
