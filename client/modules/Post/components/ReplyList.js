import React from "react";
import PropTypes from "prop-types";

// Import Components
import ReplyListItem from "./PostListItem/ReplyListItem";
// import addReply from "./ReplyListItem/ReplyListItem";

function ReplyList(props) {
  return (
    <div className="listView">
      {props.posts.map(individualReply => (
        <ReplyListItem reply={individualReply} key={individualReply.objectId} />
      ))}
    </div>
  );
}

ReplyList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      reply: PropTypes.string.isRequired,
      objectId: PropTypes.string
    })
  )
};

export default ReplyList;
