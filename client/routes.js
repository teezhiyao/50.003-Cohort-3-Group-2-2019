/* eslint-disable global-require */
import React, { Component } from "react";
//import { Route, IndexRoute } from "react-router";
import { IndexRoute } from "react-router";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from "./modules/App/App";
import PostListPage from "./modules/Post/pages/PostListPage/PostListPage";
import PostCategoryPage from "./modules/Post/pages/PostCategoryPage/PostCategoryPage";

// require.ensure polyfill for node
if (typeof require.ensure !== "function") {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== "production") {
  // Require async routes only in development for react-hot-reloader to work.
  require("./modules/Post/pages/PostListPage/PostListPage");
  require("./modules/Post/pages/PostDetailPage/PostDetailPage");
  require("./modules/Post/pages/Profile/Profile");

  require("./modules/LoginAllUpdated/Login");
  require("./modules/LoginAllUpdated/SignUp");
  require("./modules/Post/pages/Resolved/Resolved");
  require("./modules/Post/pages/Pending/Pending")
  require("./modules/Post/pages/PostCategoryPage/PostCategoryPage");
  require("./modules/Post/pages/PostGrid/PostGrid")
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require("./modules/LoginAllUpdated/Login").default);
        });
      }}
    />
    <Route
      path="/home"
      // component={PostListPage}
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(
            null,
            require("./modules/Post/pages/PostListPage/PostListPage").default
          );
        });
      }}
    />
    <Route
      path="/posts/:objectId" // colon means dynamic path
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(
            null,
            require("./modules/Post/pages/PostDetailPage/PostDetailPage")
              .default
          );
        });
      }}
    />
    <Route
      path="/cat/:category"
      getComponent={(nextState, callback) => {
        require.ensure([], require => { // moving require into require.ensure to only download the component when its needed
          callback(
            null, // no callback function
            require("./modules/Post/pages/PostCategoryPage/PostCategoryPage") // simply load this component when getComponent is called
              .default
          );
        });
      }}
    />

    {/* <Route path="/Loggedin" component={Loggedin} /> */}

    <Route
      path="/SignUpPage"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require("./modules/LoginAllUpdated/SignUp").default);
        });
      }}
    />
    <Route
      path="/profile"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require("./modules/Post/pages/Profile/Profile").default);
        });
      }}
    />
    <Route
      path="/resolved"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require("./modules/Post/pages/Resolved/Resolved").default);
        });
      }}
    />
    <Route
      path="/pending"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require("./modules/Post/pages/Pending/Pending").default);
        });
      }}
    />
    <Route
      path="/grid"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require("./modules/Post/pages/PostGrid/PostGrid").default);
        });
      }}
    />
    {/* <Route
      path="/login"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require("./modules/Login/pages/LoggedIn").default);
        });
      }}
    /> */}
  </Route>
);
