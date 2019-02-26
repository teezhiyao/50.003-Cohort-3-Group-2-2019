import PropTypes from "prop-types";
import { Link } from "react-router";
import React, { Component } from "react";
import { injectIntl, FormattedMessage } from "react-intl";

// Import Style
import styles from "./PostListItem.css";

export class PostListItem extends Component {
  addReply = () => {
    console.log("postlistitem")
    const replyRef = this.refs.replyText;
    if (replyRef.value) {
      this.props.addReply(replyRef.value, this.props.post.cuid);
      replyRef.value = '';
    }
  };

  render() {
    return (
      <div className={styles["single-post"]}>
        <h3 className={styles["post-title"]}>
          <Link to={`/posts/${this.props.post.slug}-${this.props.post.cuid}`}>
            {this.props.post.title}</Link>
        </h3><p className={styles["author-name"]}><FormattedMessage id="by" /> {this.props.post.name}</p>
        <input placeholder={"Reply"} className={styles["form-field"]} ref="replyText" />
        <p className={styles["post-action"]}><a href="#" onClick={this.addReply}><FormattedMessage id="reply" /></a></p>
        <p className={styles["post-desc"]}>{this.props.post.content}</p>
        <p className={styles["post-action"]}>
          <a href="#" onClick={this.props.onDelete}>
            <FormattedMessage id="deletePost" />
          </a>
        </p>
        <hr className={styles.divider} />
      </div>
    );
  }
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    reply: PropTypes.string
  }),
  // addReply: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  addReply: PropTypes.func.isRequired
};
export default injectIntl(PostListItem);

// export default PostListItem;
