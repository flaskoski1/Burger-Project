import React, { Component, useEffect, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "../src/containers/BurgerBuilder/BurgerBuilder";
// import Checkout from "../src/containers/Checkout/Checkout";
// import Orders from "../src/containers/Orders/Orders";
// import Auth from "../src/containers/Auth/Auth";
import Logout from "../src/containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "../src/store/actions/index";
import asyncComponent from "../src/hoc/asyncComponent/asyncComponent";

const Checkout = React.lazy(() => {
  return import("../src/containers/Checkout/Checkout");
});
const Orders = React.lazy(() => {
  return import("../src/containers/Orders/Orders");
});
const Auth = React.lazy(() => {
  return import("../src/containers/Auth/Auth");
});

const app = props => {
  useEffect(() => {
    props.onTryAutoSignup();
  }, []);
  // componentDidMount() {
  //   this.props.onTryAutoSignup();
  // }
  // render() {
  let routes = (
    <Switch>
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        {" "}
        <Route path="/checkout" render={props => <Checkout {...props} />} />
        <Route path="/orders" render={props => <Orders {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={props => <Auth {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};
// }
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
