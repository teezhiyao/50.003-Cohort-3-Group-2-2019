import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Import Components
import PostList from "../../components/PostList";
import Button from "@material-ui/core/Button";
import style from "./Pending.css";
// Import Actions
import {
  addPostRequest,
  addPostUserRequest,
  deletePostRequest,
  addReplyRequest
} from "../../PostActions";
import { toggleAddPost } from "../../../App/AppActions";

// Import Selectors
import { getShowAddPost } from "../../../App/AppReducer";
import { getPosts } from "../../PostReducer";
import { getUser } from "../../UserReducer";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import { withStyles } from "@material-ui/core/styles";


const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgb(214, 214, 214)',
    borderBottom: '1px solid rgba(0,0,0,.125)',
    marginBottom: -1,
    marginTop:30,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';


class Pending extends Component {
  componentDidMount() {
    // this function is called the moment this component is rendered.
    console.log("componentDidMount");
  }

  handleDeletePost = post => {
    // console.log(post);
    if (confirm("Do you want to delete this post")) {
      // eslint-disable-line
      this.props.dispatch(deletePostRequest(post));
    }
  };

  handleAddPost = (name, title, content, url) => {
    console.log("Maybe here");
    this.props.dispatch(toggleAddPost());
    this.props.dispatch(addPostRequest({ name, title, content, url }));
  };

  handleAddUser = (name, title, content) => {
    this.props.dispatch(toggleAddPost());
    this.props.dispatch(addPostUserRequest({ name, title, content }));
  };

  handleAddReply = (reply, cuid) => {
    this.props.dispatch(addReplyRequest({ reply, cuid }));
  };

  render() {
    return (
      <div>
        <h1 className={style.heading}>Pending Issues</h1>
        <p className={style.sorting}>Displayed below are all the issues that need to be resolved.</p>

        <PostList
          handleDeletePost={this.handleDeletePost}
          handleAddReply={this.handleAddReply}
          posts={this.props.posts.filter(post => post.resolveStatus === false)}
        />
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  console.log(state);
  return {
    showAddPost: getShowAddPost(state),
    posts: getPosts(state),
    users: getUser(state)
  };
}

Pending.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      objectId: PropTypes.string.isRequired,
      reply: PropTypes.string,
      category: PropTypes.string,
      url: PropTypes.state
    })
  ),
  users: PropTypes.shape({
    name: PropTypes.string,
    userType: PropTypes.string,
    sessionToken: PropTypes.string.isRequired,
    objectId: PropTypes.string.isRequired
  }),
  showAddPost: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

Pending.contextTypes = {
  router: PropTypes.object
};

export default connect(mapStateToProps)(Pending);
