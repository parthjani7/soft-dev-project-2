import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.props.logoutUser();
  }
  render() {
    return null;
  }
}

Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logoutUser })(Logout);
