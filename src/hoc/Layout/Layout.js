import React, { Component, useState } from "react";
import Aux from "../../hoc/Aux/Aux";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

const layout = props => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);
  // state = {
  //   showSideDrawer: false
  // };

  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false);
    // this.setState({ showSideDrawer: false });
  };
  const sideDrawerToggleHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
    // this.setState(prevState => {
    //   return { showSideDrawer: !prevState.showSideDrawer };
    // });
  };
  // render() {
  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={sideDrawerIsVisible}
        closed={sideDrawerClosedHandler}
      ></SideDrawer>
      <div>Toolbar, SideDrawer, Backdrop</div>
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};
// }
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};
export default connect(mapStateToProps)(layout);
