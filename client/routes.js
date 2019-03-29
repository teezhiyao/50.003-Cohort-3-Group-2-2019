/* eslint-disable global-require */
import React, { Component } from "react";
import { Route, IndexRoute } from "react-router";
import App from "./modules/App/App";
//import { Loggedin } from "./modules/Login/pages/Loggedin";

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
  
  require("./modules/Login/Login");
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>
    <IndexRoute
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
    {/* <Route path="/Loggedin" component={Loggedin} /> */}
    <Route
      path="/loginx"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(
            null,
            require("./modules/Login/Login").default
          );
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
