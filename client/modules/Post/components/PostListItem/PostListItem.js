import PropTypes from "prop-types";
import { Link } from "react-router";
import React, { Component } from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
// Import Style
import styles from "./PostListItem.css";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { withRouter } from "react-router";

import DeleteIcon from "@material-ui/icons/Delete";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

export class PostListItem extends Component {
  state = {
    resolve: false
  };
  addReply = () => {
    // console.log('postlistitem');
    const replyRef = this.refs.replyText;
    if (replyRef.value) {
      this.props.addReply(replyRef.value, this.props.post.cuid);
      replyRef.value = "";
    }
  };

  handleChange = name => event => {
    console.log(name);
    console.log(event.target.checked);
    // console.log(this.props.location.pathname);
    if (name === "resolve") {
      this.props.updatePost({
        resolve: event.target.checked,
        postId: this.props.post.objectId
      });
    }
    this.setState({ [name]: event.target.checked });
  };

  render() {
    return (
      <Card id="postcard">
        <CardContent>
          {/* <p> {this.props.location.pathname}</p> */}

          {this.props.location.pathname !== "/home" && (
            <p>
              <h3 className={styles["post-title"]} id="posttitle">
                <Link to={`/posts/${this.props.post.objectId}`}>
                  {this.props.post.title}
                </Link>
              </h3>
              <p className={styles["author-name"]}>
                <FormattedMessage id="by" /> {this.props.post.username}
              </p>
            </p>
          )}
          <span className={styles["post-desc"]}>{this.props.post.content}</span>
          {this.props.post.imageData !== "placeholder" && (
            <img src={this.props.post.imageData} />
          )}
          <span style={{ float: "right" }} className={styles["post-action"]}>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.resolve}
                  onChange={this.handleChange("resolve")}
                  color="primary"
                />
              }
              label={this.state.resolve ? "Resolved" : "Unresolved"}
            />
          </span>
        </CardContent>
      </Card>
    );
  }
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string,
    cuid: PropTypes.string,
    objectId: PropTypes.string.isRequired,
    reply: PropTypes.string,
    imageData: PropTypes.string,
    dateCreated: PropTypes.string
  }),
  location: PropTypes.object.isRequired,
  // addReply: PropTypes.func.isRequired,
  addReply: PropTypes.func,
  updatePost: PropTypes.func
};
export default withRouter(PostListItem);

// export default PostListItem;
