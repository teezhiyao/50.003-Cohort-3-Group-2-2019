import React from "react";
import PropTypes from "prop-types";

// Import Components
import PostListItem from "./PostListItem/PostListItem";
import addReply from "./PostListItem/PostListItem";

function PostList(props) {
  return (
    <div className="listView">
      {props.posts.map(individualPost => (
        <PostListItem
          post={individualPost}
          key={individualPost.cuid}
          addReply={props.handleAddReply}
          onDelete={() => props.handleDeletePost(individualPost.cuid)}
        />
      ))}
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      cuid: PropTypes.string.isRequired,
      reply: PropTypes.string
    })
  ),
  handleDeletePost: PropTypes.func.isRequired,
  handleAddReply: PropTypes.func.isRequired
};

export default PostList;
