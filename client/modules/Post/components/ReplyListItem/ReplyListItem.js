import PropTypes from "prop-types";
import { Link } from "react-router";
import React, { Component } from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
// Import Style
// import styles from "./ReplyListItem.css";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    width: "100%"
  },
  numberingHeader: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "2.00%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexBasis: "88.00%"
  },
  miscHeading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "10.00%"
  }
});

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
    const { classes } = this.props;

    return (
      <Card>
        <CardContent>
          <Typography className={classes.secondaryHeading}>
            {this.props.reply.content}
          </Typography>
          <Typography
            className={classes.numberingHeading}
            href="#"
            align="right"
            onClick={this.props.onDelete}
          >
            <DeleteIcon id="deleteReplies" />
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

ReplyListItem.propTypes = {
  reply: PropTypes.shape({
    content: PropTypes.string.isRequired,
    objectId: PropTypes.string,
    postId: PropTypes.string.isRequired
  }),
  onDelete: PropTypes.func.isRequired
};
export default withStyles(styles)(ReplyListItem);

// export default ReplyListItem;
