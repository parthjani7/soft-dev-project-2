import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addAssignment } from "../../../../actions/assignmentActions";

class Add extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "hello world",
      description: "Enter a code snippet",
      due: "2019-04-29"
    };
  }
  onChange = e => this.setState({ [e.target.id]: e.target.value });
  onClickCreate = e => {
    e.preventDefault();
    this.props
      .addAssignment(this.props.match.params.id, this.state)
      .then(() => {
        window.location.href = `/courses/${this.props.match.params.id}/assignments`;
      });
  };

  render() {
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-md-8 offset-2">
            <div className="card">
              <div className="card-header">
                <strong>Create an Assignment!</strong>
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
                      placeholder="Enter Assignment Name"
                      id="name"
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      required
                      className="form-control"
                      onChange={this.onChange}
                      rows="5"
                      value={this.state.description}
                      placeholder="Enter Assignment Description"
                      id="description"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      required
                      type="date"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.due}
                      placeholder="Enter Assignment Due"
                      id="due"
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
  addAssignment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { addAssignment })(Add);
