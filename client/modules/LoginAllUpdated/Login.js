import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Bootstrap from "react-bootstrap";
import "./Login.css";
import {fetchLogin} from "../Post/PostActions"

export default class Login extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    console.log(event.target.value);
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  
    try {

      const email = this.state.email;
      const password = this.state.password;
      // console.log(props.user);
      if (confirm("Do you want to Log in")) {
        fetchLogin(email, password);
      }

    } catch (e) {
      alert(e.message);
    }
  }

  render() {
    console.log("handling submit");
    return (
        <div className="Login">
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
            <Button
              // block
              bssize="large"
              disabled={!this.validateForm()}
              type="submit"
            >
              Login
            </Button>

            
            
              
          </Form>
          {/* <Link to={`/SignUp`}> */}
          <Button type="signup">
                Sign Up
              </Button>
          {/* </Link> */}
        </div>
      );
  }
}
