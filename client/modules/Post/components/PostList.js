import React from "react";
import PropTypes from "prop-types";

// Import Components
import PostListItem from "./PostListItem/PostListItem";
import addReply from "./PostListItem/PostListItem";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

//takes in props(all posts) and displays every post
function PostList(props) {
  return (
    <div className="listView">
      {props.posts.map((individualPost, index) => (
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{index + 1}</Typography>
            <Typography>{" : "}</Typography>
            <Typography>{individualPost.title}</Typography>
          </ExpansionPanelSummary>
          <PostListItem
            post={individualPost}
            key={individualPost.cuid}
            addReply={props.handleAddReply}
            onDelete={() => props.handleDeletePost(individualPost.objectId)}
          />
        </ExpansionPanel>
      ))}
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      objectId: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      cuid: PropTypes.string,
      reply: PropTypes.string
    })
  ),
  handleDeletePost: PropTypes.func.isRequired,
  handleAddReply: PropTypes.func.isRequired
};

export default PostList;
