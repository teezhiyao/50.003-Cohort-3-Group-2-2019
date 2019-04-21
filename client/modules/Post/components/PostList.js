import React, { Component } from "react";
import PropTypes from "prop-types";

// Import Components
import PostListItem from "./PostListItem/PostListItem";
import { Link } from "react-router";
import addReply from "./PostListItem/PostListItem";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";
import { Chip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { grey } from "@material-ui/core/colors";

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

//takes in props(all posts) and displays every post
class PostList extends Component {
  handleClickChip = () => {
    console.log("clicked chip");
  };

  render() {
    const { classes } = this.props;
    return (

      <div className="listView">
        {this.props.posts.map((individualPost, index) => (
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.numberingHeader}>
                {index + 1}
              </Typography>
              <Typography className={classes.secondaryHeading}>
                <Link to={`/posts/${individualPost.objectId}`}>
                  {individualPost.title}
                </Link>
              </Typography>

              <Typography className={classes.secondaryHeading}>
                {"By " + individualPost.username}
              </Typography>

              <Typography className={classes.secondaryHeading}>
                {individualPost.createdAt.substring(0, 10)}
              </Typography>

              {/* UNCOMMENT FOR PRIORITY DISPLAY */}
              {/* <Typography className={classes.secondaryHeading}>
                  {individualPost.priority}
              </Typography> */}

              <Typography className={classes.secondaryHeading}>
                Category:
                <Link to={`/cat/${individualPost.category}`}>
                  <Chip
                    label={individualPost.category}
                    onClick={this.handleClickChip}
                  />
                </Link>
              </Typography>
              <span
                href="#"
                align="right"
                onClick={() =>
                  this.props.handleDeletePost(individualPost.objectId)
                }
              >
                <DeleteIcon id="deletePost" />
              </span>
              {/* <Typography className={classes.miscHeading}>{"tags"}</Typography> */}
            </ExpansionPanelSummary>

            <PostListItem
              post={individualPost}
              key={individualPost.cuid}
              addReply={this.props.handleAddReply}
              updatePost={this.props.handlePostUpdate}
            />
          </ExpansionPanel>
        ))}
      </div>
      
    );
  }
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      objectId: PropTypes.string.isRequired,
      slug: PropTypes.string,
      cuid: PropTypes.string,
      reply: PropTypes.string,
      category: PropTypes.string,
      imageData: PropTypes.string
    })
  ),
  handleDeletePost: PropTypes.func.isRequired,
  handleAddReply: PropTypes.func.isRequired,
  handlePostUpdate: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostList);
