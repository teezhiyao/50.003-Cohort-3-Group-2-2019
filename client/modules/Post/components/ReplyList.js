import React from "react";
import PropTypes from "prop-types";

// Import Components
import ReplyListItem from "./ReplyListItem/ReplyListItem";
// import addReply from "./ReplyListItem/ReplyListItem";

function ReplyList(props) {
  return (
    <div className="listView">
      {props.replies.map(individualReply => (
        <ReplyListItem reply={individualReply} key={individualReply.objectId} />
      ))}
    </div>
  );
}

ReplyList.propTypes = {
  replies: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      content: PropTypes.string.isRequired,
      objectId: PropTypes.string,
      postId: PropTypes.string
    })
  )
};

export default ReplyList;
