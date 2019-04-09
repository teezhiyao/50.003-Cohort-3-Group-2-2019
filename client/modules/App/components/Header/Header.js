import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { getUser } from "../../../Post/UserReducer";
// Import Style
import styles from "./Header.css";

class Header extends Component {
  // languageNodes = this.props.intl.enabledLanguages.map(lang => (
  //   <li
  //     key={lang}
  //     onClick={() => this.props.switchLanguage(lang)}
  //     className={lang === this.props.intl.locale ? styles.selected : ""}
  //   >
  //     {lang}
  //   </li>
  // ));

  render() {
    return (
      <div className={styles.header}>
        <div className={styles["language-switcher"]}>
          <ul />
        </div>
        <div className={styles.content}>
          <Typography variant="h3" color="inherit">
            Ticketing Support System
          </Typography>

          {/* {context.router.isActive("/", true) ? (
            <Button
              variant="contained"
              color="primary"
              href="#"
              onClick={this.props.toggleAddPost}
            >
              Add Issue
            </Button>
          ) : null} */}
          {
            <Button
              variant="contained"
              color="primary"
              href="#"
              onClick={this.props.toggleAddPost}
            >
              Add Issue
            </Button>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: getUser(state)
  };
}

Header.contextTypes = {
  router: PropTypes.object
};

Header.propTypes = {
  toggleAddPost: PropTypes.func.isRequired,
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  users: PropTypes.shape({
    name: PropTypes.string,
    userType: PropTypes.string,
    sessionToken: PropTypes.string.isRequired,
    objectId: PropTypes.string.isRequired
  })
};

export default connect(mapStateToProps)(Header);
