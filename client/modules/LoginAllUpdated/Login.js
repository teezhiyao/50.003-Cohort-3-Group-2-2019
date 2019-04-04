import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Bootstrap from "react-bootstrap";
import "./Login.css";
import { fetchLogin } from "../Post/PostActions";
import { Link } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { browserHistory } from "react-router";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      redirect: false
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  // returnRedirect() {
  //   return this.state.redirectToReferrer;
  // }

  handleChange = event => {
    console.log(event.target.value);
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  // renderRedirect = () => {
  //   if (this.state.redirect) {
  //     this.setState({ redirect: false });
  //     return <Redirect to={{ pathname: `/` }} />;
  //   }
  // };

  // nextPage() {
  //   this.setState((state, prop) => {
  //     return {
  //       page: state.page + 1
  //     };
  //   });
  // }

  handleSubmit = event => {
    event.preventDefault();
    // console.log(this.state.redirect);
    try {
      const email = this.state.email;
      const password = this.state.password;
      // this.props.dispatch(fetchLogin(email, password));
      console.log("IN HANDLE SUBMIT");
      // this.props
      //   .dispatch(fetchLogin(email, password))
      //   .then(function(response) {
      //     console.log("Success!", response.user.objectId);
      //     return response.user.objectId;
      //   });

      if (confirm("Do you want to Log in")) {
        this.props.dispatch(fetchLogin(email, password)).then(
          function(response) {
            if (response.user.objectId === "XHNhUvlgx5") {
              console.log("Success!", response.user.objectId);
              browserHistory.push("/SignUpPage");
              // this.setState(() => {
              //   return {
              //     redirect: true
              //   };
              // });
            }
          }.bind(this)
        );
      }
    } catch (e) {
      alert(e.message);
    }
  };

  render() {
    console.log("handling submit");

    // if (this.state.redirectToReferrer) {
    //   return <Redirect to="/" />;
    // }
    return (
      <div className="Login">
        {/* {this.state.redirect === true && (
          <Redirect
            from={{ pathname: "Login" }}
            to={{ pathname: `/SignUpPage` }} */}
        /> )}
        {
          <div>
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
            <Link to={`/SignUpPage`}>
              <Button type="signup">Sign Up</Button>
            </Link>
          </div>
        }
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
