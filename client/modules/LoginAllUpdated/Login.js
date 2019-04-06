import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "@material-ui/core/Button";
import Bootstrap from "react-bootstrap";
import "./Login.css";
import {
  fetchLogin,
  fetchPosts,
  fetchReplies,
  fetchAllowedPosts
} from "../Post/PostActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link, browserHistory } from "react-router";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirect: false
    };
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    // console.log(this.state.redirect);
    try {
      const email = this.state.email;
      const password = this.state.password;
      console.log("IN HANDLE SUBMIT");
      if (confirm("Do you want to Log in")) {
        this.props.dispatch(fetchLogin(email, password)).then(
          function(response) {
            console.log(!response.user.code);
            if (!response.user.code) {
              console.log("Success!", response.user.objectId);
              console.log(response);
              this.props.dispatch(
                fetchAllowedPosts(response.user.sessionToken)
              );
              this.props.dispatch(fetchReplies());
              browserHistory.push("/home");
            } else if (response.user.code === 101) {
              console.log("Failed Login!");
            }
          }.bind(this)
        );
      }
    } catch (e) {
      alert(e.message);
    }
  };

  render() {
    return (
      <div className="Login">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="email" bsSize="large">
            <Form.Control
              autoFocus
              // type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password" bsSize="large">
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </Form.Group>
          <Button
            block
            bsSize="large"
            variant="contained"
            color="primary"
            disabled={!this.validateForm()}
            type="submit"
            onClick={this.handleSubmit}
          >
            Login
          </Button>{" "}
          <Link to={`/SignUpPage`}>
            <Button variant="contained" color="primary" type="signup">
              Sign Up
            </Button>
          </Link>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  // props.post = getPost(state, props.params.objectId);
  // console.log(props.post);

  return {};
}

Login.propTypes = {
  user: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string
    })
  ),
  dispatch: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps)(Login));
