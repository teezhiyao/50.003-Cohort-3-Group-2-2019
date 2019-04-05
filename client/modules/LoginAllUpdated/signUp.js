import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import React, { Component } from "react";
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// import Bootstrap from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import "./signUp.css";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    this.setState({ newUser: "test" });

    this.setState({ isLoading: false });
  };

  // handleConfirmationSubmit = async event => {
  //   event.preventDefault();

  //   this.setState({ isLoading: true });
  // };

  handleConfirmationSubmit = event => {
    event.preventDefault();

    this.setState({ isLoading: true });
  };

  render() {
    return (
      <div className="SignUp">
        {this.state.newUser === null && (
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="email" bssize="large">
              <Form.Control
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password" bssize="large">
              <Form.Control
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword" bssize="large">
              <Form.Control
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                type="password"
              />
            </Form.Group>
            <Button
              //block
              bssize="large"
              disabled={!this.validateForm()}
              type="submit"
              // isLoading={this.state.isLoading}
              // text="Signup"
              // loadingText="Signing up…"
            >
              Sign Up
            </Button>
          </Form>
        )}
        {this.state.newUser !== null && (
          <Form onSubmit={this.handleConfirmationSubmit}>
            <Form.Group controlId="confirmationCode" bssize="large">
              <Form.Control
                autoFocus
                type="tel"
                value={this.state.confirmationCode}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              //block
              bssize="large"
              disabled={!this.validateConfirmationForm()}
              type="submit"
              // isLoading={this.state.isLoading}
              // text="Verify"
              // loadingText="Verifying…"
            />
          </Form>
        )}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  // props.post = getPost(state, props.params.objectId);
  // console.log(props.post);

  return {};
}

SignUp.propTypes = {
  user: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string
    })
  ),
  dispatch: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps)(SignUp));
