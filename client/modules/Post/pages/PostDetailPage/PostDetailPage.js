import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { FormattedMessage } from "react-intl";
import ToggleButton from "react-toggle-button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
// Import Style
import styles from "../../components/PostListItem/PostListItem.css";

import PostListItem from "../../components/PostListItem/PostListItem";
import ReplyList from "../../components/ReplyList";

// Import ActionsY
import {
  fetchPosts,
  fetchPost,
  fetchReplies,
  addReplyRequest,
  deleteReplyRequest,
  updatePostRequest
} from "../../PostActions";

// Import Selectors
import { getPost, getPosts } from "../../PostReducer";
import { getReplies } from "../../RepliesReducer";



class PostDetailPage extends Component {
  state = {
    value: false,
    resolve: false
  };
  componentDidMount() {
    this.props.dispatch(fetchPost(this.props.post.objectId));
    this.props.dispatch(fetchReplies(this.props.post.objectId));
  }

  handleDeletePost = post => {
    if (confirm("Do you want to delete this post")) {
      this.props.dispatch(deletePostRequest(post));
    }
  };

  handleChange = name => event => {
    console.log(name);
    console.log(event.target.checked);
    this.setState({ [name]: event.target.checked });
  };

  handleToggle = value => {
    this.setState({
      value: !value
    });
    console.log(value);
    console.log(this.props.post);
    console.log(this.props.post.resolveStatus);
    this.props.dispatch(
      updatePostRequest({ resolveStatus: this.props.post.resolveStatus })
    );

    //NEED TO CHANGE THE RESOLVE STATUS IN DATABASE

    //console.log(this.props.post.resolveStatus.);
    //console.log(this.props.post)
  };

  handleAddReply = (reply, cuid) => {
    this.props.dispatch(addReplyRequest({ reply, cuid }));
  };

  handleDeleteReply = reply => {
    // console.log(post);
    if (confirm("Do you want to delete this reply")) {
      // eslint-disable-line
      this.props.dispatch(deleteReplyRequest(reply));
    }
  };

  addReply = () => {
    const replyRef = this.refs.reply;
    const cuid = "asdkjsa";
    console.log(replyRef.value);
    console.log("I'm here");
    this.props.dispatch(
      addReplyRequest(replyRef.value, this.props.post.objectId)
    );
    if (replyRef.value) {
      //this.addReply(replyRef.value);
      replyRef.value = "";
    }
  };

  render() {
    return (
      <div id="post">
        <PostListItem
          post={this.props.post}
          key={this.props.post.objectId}
          addReply={this.handleAddReply}
          onDelete={() => this.handleDeletePost(this.props.post.objectId)}
        />
        <ReplyList
          handleDeleteReply={this.handleDeleteReply}
          handleAddReply={this.handleAddReply}
          replies={this.props.replies}
        />
        <input
          placeholder={"Reply to Issue"}
          className={styles["form-field"]}
          ref="reply"
        />
        <a
          className={styles["post-submit-button"]}
          href="#"
          onClick={this.addReply}
        >
          Reply
        </a>

      </div>
    );
  }
}

// Actions required to provide data for this component to render in server side.
PostDetailPage.need = [
  params => {
    return fetchPost(params.objectId);
  }
];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  console.log("Mapping here");
  console.log(state);
  // props.post = getPost(state, props.params.objectId);
  // console.log(props.post);

  return {
    post: getPost(state, props.params.objectId),
    replies: getReplies(state)
  };
}

PostDetailPage.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string.isRequired,
    objectId: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string,
    reply: PropTypes.string
  }),
  replies: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      content: PropTypes.string.isRequired,
      objectId: PropTypes.string.isRequired,
      postId: PropTypes.string.isRequired
    })
  ),
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(PostDetailPage);

