import React, { Component, useEffect } from "react";
import * as actions from "../../../store/actions/index";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
const logout = (props) => {
  // componentDidMount() {
  useEffect(() => {
    props.onLogout();
  }, []);

  // }
  // render() {
  return <Redirect to="/" />;
};
// }
const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(logout);
