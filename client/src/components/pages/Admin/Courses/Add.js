import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCourse } from "../../../../actions/courseActions";

class Add extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      code: ""
    };
  }
  onChange = e => this.setState({ [e.target.id]: e.target.value });
  onClickCreate = e => {
    e.preventDefault();
    this.props.addCourse(this.state).then(() => {
      window.location.href = `/courses`;
    });
  };

  render() {
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-md-8 offset-2">
            <div className="card">
              <div className="card-header">
                <strong>Create a Course!</strong>
              </div>
              <div className="card-body">
                <form onSubmit={this.onClickCreate}>
                  <div className="form-group">
                    <input
                      required
                      type="text"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.name}
                      placeholder="Enter Course Name"
                      id="name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      required
                      type="text"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.code}
                      placeholder="Enter Course Code"
                      id="code"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
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
Add.propTypes = {
  addCourse: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { addCourse })(Add);
