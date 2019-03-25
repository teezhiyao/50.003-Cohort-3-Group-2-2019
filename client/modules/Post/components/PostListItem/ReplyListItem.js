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

export class ReplyListItem extends Component {
  //   addReply = () => {
  //     console.log('replylistitem');
  //     const replyRef = this.refs.replyText;
  //     if (replyRef.value) {
  //       this.props.addReply(replyRef.value, this.props.reply.cuid);
  //       replyRef.value = '';
  //     }
  //   };

  render() {
    return (
      <Card>
        <CardContent>
          <p className={styles["reply-desc"]}>{this.props.reply.content}</p>
        </CardContent>
      </Card>
    );
  }
}

ReplyListItem.propTypes = {
  reply: PropTypes.shape({
    content: PropTypes.string.isRequired,
    objectId: PropTypes.string
  })
};
export default injectIntl(ReplyListItem);

// export default ReplyListItem;
