/**
 * Root Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import IntlWrapper from './modules/Intl/IntlWrapper';
import {BrowserRouter, ServerRouter} from 'react-router-dom';
import Login from "../client/modules/Login/Login";


// Import Routes
import routes from './routes';

// Base stylesheet
require('./main.css');

export default function App(props) {
  console.log("in main function");
  return (
    <Provider store={props.store}>
    <BrowserRouter>
      <IntlWrapper>
        <Router history={browserHistory}>
          {routes}
          {/* <Route path="/login" exact component={Login} /> */}
          
        </Router>
      </IntlWrapper>
    </BrowserRouter>
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};
