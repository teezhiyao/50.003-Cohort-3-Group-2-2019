import React from "react";
import PropTypes from "prop-types";

// Import Components
import ReplyListItem from "./ReplyListItem/ReplyListItem";
import addReply from "./ReplyListItem/ReplyListItem";

function ReplyList(props) {
  return (
    <div className="listView">
      {props.posts.map(individualReply => (
        <ReplyListItem post={individualReply} key={individualReply.cuid} />
      ))}
    </div>
  );
}

ReplyList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      reply: PropTypes.string.isRequired,
      cuid: PropTypes.string.isRequired
    })
  )
};

export default ReplyList;
