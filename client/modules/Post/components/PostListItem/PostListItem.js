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
import PostDetailPage from "../../pages/PostDetailPage/PostDetailPage";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export class PostListItem extends Component {
  addReply = () => {
    // console.log('postlistitem');
    const replyRef = this.refs.replyText;
    if (replyRef.value) {
      this.props.addReply(replyRef.value, this.props.post.cuid);
      replyRef.value = "";
    }
  };

  render() {
    return (
      <Card>
        <CardContent>
          <h3 className={styles["post-title"]}>
            <Link to={`/posts/${this.props.post.objectId}`}>
              {this.props.post.title}
              {/* <PostDetailPage post={this.props.post} /> */}
            </Link>
          </h3>
          <p className={styles["author-name"]}>
            <FormattedMessage id="by" /> {this.props.post.name}
          </p>
          <p className={styles["post-desc"]}>{this.props.post.content}</p>
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
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string,
    objectId: PropTypes.string.isRequired,
    reply: PropTypes.string
  }),
  // addReply: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  addReply: PropTypes.func.isRequired
};
export default injectIntl(PostListItem);

// export default PostListItem;
