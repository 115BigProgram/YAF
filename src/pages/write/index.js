import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Editor from "./components/editor"
import { actionCreators as loginActionCreators } from "../login/store";

const Write = props => {
  const { loginStatus,handleShowLogin } = props;
  if (loginStatus) {
    return (
      <Editor/>
    );
  } else {
    handleShowLogin()
    return (
      <Redirect to="/"/>
    )
  }
};

const mapState = state => ({
  loginStatus: state.getIn(["login", "login"])
});

const mapDispatch = dispatch =>({
    handleShowLogin() {
        dispatch(loginActionCreators.showPopup(true))
    }
})

export default connect(
  mapState,
  mapDispatch
)(Write);
