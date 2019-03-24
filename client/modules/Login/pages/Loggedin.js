import PropTypes from "prop-types";
import { Link } from "react-router";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
// Import Style
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { injectIntl, FormattedMessage } from "react-intl";
// import styles from "./PostListItem.css";
import styles from "../../Post/components/PostListItem/PostListItem.css";
import { Redirect } from "react-router-dom";

// const Loggedin = () => {
//     return (
//         <div>
//             <p>>Logged in</p>
//         </div>
//     );
// }

export class Loggedin extends Component {
  state = {
    redirect: false
  };

  verify = () => {
    this.setState({
      redirect: true
    });

    // const usernameRef = this.refs.username;
    // const passwordRef = this.refs.password;
    // const emailRef = this.refs.email;
    // if (
    //   usernameRef === "teezhiyao" &&
    //   passwordRef === "teezhiyao" &&
    //   emailRef === "teezhiyao@gmail"
    // ) {
    //   console.log("Log in Works");
    //   this.setState({
    //     redirect: true
    //   });
    // } else {
    //   console.log("Log in Failed");
    // }
  };

  //   setRedirect = () => {
  //     this.setState({
  //       redirect: true
  //     });
  //   };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };
  render() {
    return (
      <div>
        <Card>
          <CardContent>
            <p className={styles["post-desc"]}>{"Log in Here"}</p>
            <form noValidate autoComplete="off">
              <input
                placeholder={"Username"}
                className={styles["form-field"]}
                ref="username"
              />
              <input
                placeholder={"Password"}
                className={styles["form-field"]}
                ref="password"
              />
              <input
                placeholder={"Email Address"}
                className={styles["form-field"]}
                ref="email"
              />
            </form>
          </CardContent>
          <CardActions>
            {this.renderRedirect()}
            <Button
              variant="contained"
              color="primary"
              href="#"
              onClick={this.verify}
            >
              Log in
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

Loggedin.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string,
    objectId: PropTypes.string.isRequired,
    reply: PropTypes.string
  })
};

export default injectIntl(Loggedin);
