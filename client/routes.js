/* eslint-disable global-require */
import React, { Component } from "react";
import { Route, IndexRoute } from "react-router";
import App from "./modules/App/App";

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
  require("../client/src/App");
  require("./modules/LoginAllUpdated/Login");
  require("./modules/LoginAllUpdated/SignUp");
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>
    <Route
      path="/home"
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
      path="/posts/:objectId"
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
      path="/Loggedin"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require("./modules/LoginAllUpdated/Login").default);
        });
      }}
    />
    <Route
      path="/SignUpPage"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require("./modules/LoginAllUpdated/SignUp").default);
        });
      }}
    />
  </Route>
);
