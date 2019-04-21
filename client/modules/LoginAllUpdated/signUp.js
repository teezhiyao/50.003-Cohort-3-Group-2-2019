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
import styles from "./signUp.css";
import { createUser } from "../Post/PostActions";
import { browserHistory } from "react-router";

import "./signUp.css";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      username: "",
      name: "",
      age: "",
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

    // this.setState({ isLoading: true });

    // this.setState({ newUser: "test" });

    // this.setState({ isLoading: false });

    console.log("IN HANDLE SUBMIT");
    if (confirm("Confirm Sign Up")) {
      this.props.dispatch(createUser(this.state)).then(
        function(response) {
          console.log("Then of createUser");
          console.log(response);
          if (!response.code) {
            console.log("Success!");
            browserHistory.push("/");
          } else {
            alert(response.error);
          }
        }.bind(this)
      );
    }
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
          <Form onSubmit={this.handleSubmit} className={styles["form"]}>
            <Form.Group controlId="name" className={styles["form-field"]}>
              <Form.Control
                className={styles["form-field-text"]}
                placeholder="Name"
                autoFocus
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="username" className={styles["form-field"]}>
              <Form.Control
                className={styles["form-field-text"]}
                placeholder="Username"
                autoFocus
                type="text"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="email" className={styles["form-field"]}>
              <Form.Control
                className={styles["form-field-text"]}
                placeholder="Email"
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="age" className={styles["form-field"]}>
              <Form.Control
                className={styles["form-field-text"]}
                placeholder="Age"
                autoFocus
                type="text"
                value={this.state.age}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password" className={styles["form-field"]}>
              <Form.Control
                className={styles["form-field-text"]}
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
              />
            </Form.Group>
            <Form.Group
              controlId="confirmPassword"
              className={styles["form-field"]}
            >
              <Form.Control
                className={styles["form-field-text"]}
                placeholder="Confirm Password"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                type="password"
              />
            </Form.Group>
            <button
              //block
              className={styles["post-button"]}
              disabled={!this.validateForm()}
              type="submit"
              // isLoading={this.state.isLoading}
              // text="Signup"
              // loadingText="Signing up…"
            >
              Sign Up
            </button>
          </Form>
        )}
        {this.state.newUser !== null && (
          <Form
            onSubmit={this.handleConfirmationSubmit}
            className={styles["form"]}
          >
            <Form.Group
              controlId="confirmationCode"
              className={styles["form-field"]}
            >
              <Form.Control
                className={styles["form-field-text"]}
                autoFocus
                type="tel"
                value={this.state.confirmationCode}
                onChange={this.handleChange}
              />
            </Form.Group>
            <button
              //block
              className={styles["post-button"]}
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
  user: PropTypes.shape({
    username: PropTypes.string
  }),
  dispatch: PropTypes.func.isRequired
};



export default withRouter(connect(mapStateToProps)(SignUp));
