import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Import Components
import PostList from "../../components/PostList";
import PostCreateWidget from "../../components/PostCreateWidget/PostCreateWidget";

// Import Actions
import {
  addPostRequest,
  addPostUserRequest,
  fetchPosts,
  deletePostRequest,
  addReplyRequest
} from "../../PostActions";
import { toggleAddPost } from "../../../App/AppActions";

// Import Selectors
import { getShowAddPost } from "../../../App/AppReducer";
import { getPosts } from "../../PostReducer";

class PostMainPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  handleDeletePost = post => {
    // console.log(post);
    if (confirm("Do you want to delete this post")) {
      // eslint-disable-line
      this.props.dispatch(deletePostRequest(post));
    }
  };

  handleAddPost = (name, title, content) => {
    console.log("Maybe here");
    this.props.dispatch(toggleAddPost());
    this.props.dispatch(addPostRequest({ name, title, content }));
  };

  handleAddUser = (name, title, content) => {
    this.props.dispatch(toggleAddPost());
    this.props.dispatch(addPostUserRequest({ name, title, content }));
  };

  handleAddReply = (reply, cuid) => {
    // console.log("PostMainPage log");
    // console.log((reply, cuid));
    this.props.dispatch(addReplyRequest({ reply, cuid }));
  };

  render() {
    return (
      <div>
        <PostCreateWidget
          addPost={this.handleAddPost}
          addUser={this.handleAddUser}
          showAddPost={this.props.showAddPost}
        />
        <PostList
          handleDeletePost={this.handleDeletePost}
          handleAddReply={this.handleAddReply}
          posts={this.props.posts}
        />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
PostMainPage.need = [
  () => {
    return fetchPosts();
  }
];

// Retrieve data from store as props
function mapStateToProps(state) {
  // console.log(state);
  return {
    showAddPost: getShowAddPost(state),
    posts: getPosts(state)
  };
}

PostMainPage.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      reply: PropTypes.string
    })
  ),
  showAddPost: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

PostMainPage.contextTypes = {
  router: PropTypes.object
};

export default connect(mapStateToProps)(PostMainPage);
