import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Bootstrap from "react-bootstrap";
import "./Login.css";
import { tryLogin, fetchPosts } from "../Post/PostActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }
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
  };

  // Login = () => {
  //   this.props.dispatch(addReplyRequest({ this.state.email, cuid }));
  // };

  Login = () => {
    const email = this.state.email;
    const password = this.state.password;
    if (this.props.dispatch(tryLogin(email, password)).code) {
      console.log("go to new link");
    }

    // if (nameRef.value && titleRef.value && contentRef.value) {
    //   this.props.addPost(nameRef.value, titleRef.value, contentRef.value);
    //   nameRef.value = titleRef.value = contentRef.value = "";
    // }
  };

  render() {
    return (
      <div className="Login">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="email" bsSize="large">
            <Form.Control
              autoFocus
              type="email"
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
            disabled={!this.validateForm()}
            type="submit"
            onClick={this.Login}
          >
            Login
          </Button>
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
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Login);
