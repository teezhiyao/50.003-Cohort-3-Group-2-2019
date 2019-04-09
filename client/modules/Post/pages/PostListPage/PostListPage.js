import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Import Components
import PostList from "../../components/PostList";
import PostCreateWidget from "../../components/PostCreateWidget/PostCreateWidget";
import Button from "@material-ui/core/Button";

// Import Actions
import {
  addPostRequest,
  addPostUserRequest,
  fetchAllowedPosts,
  deletePostRequest,
  addReplyRequest
} from "../../PostActions";
import { toggleAddPost } from "../../../App/AppActions";

// Import Selectors
import { getShowAddPost } from "../../../App/AppReducer";
import { getPosts } from "../../PostReducer";
import { getUser } from "../../UserReducer";

class PostListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorySelected: "all"
    };
  }

  componentDidMount() {
    // this function is called the moment this component is rendered.
    console.log("componentDidMount");
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("Component should update");
  //   this.props.dispatch(fetchPosts());
  //   return true;
  // }

  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   console.log("In Component DId Update");
  //   console.log(prevProps.posts);
  //   // if (this.props.posts.length !== prevProps.userID) {
  //   //   this.props.dispatch(fetchAllowedPosts(props.users.objectId));
  //   // }
  // }

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
    // console.log('PostListPage log');
    // console.log((reply, cuid));
    this.props.dispatch(addReplyRequest({ reply, cuid }));
  };

  handleSelectCategory = e => {
    this.setState({ categorySelected: e.target.value });
    console.log(this.state);
  };

  placeholder = () => {
    console.log("In Place Holder");
    console.log(this.props.users);
  };

  render() {
    const categoryList = [
      { value: "all", label: "All Issues" },
      { value: "LOGINISSUE", label: "Login Issue" },
      { value: "APIERROR", label: "API Issue" },
      { value: "LOGOUTISSUE", label: "Logout Issue" }
    ];
    return (
      <div>
        <PostCreateWidget
          addPost={this.handleAddPost}
          addUser={this.handleAddUser}
          showAddPost={this.props.showAddPost}
        />
        <label>
          {" "}
          Issue Category
          <select onChange={this.handleSelectCategory}>
            {categoryList.map(category => {
              return <option value={category.value}>{category.label}</option>;
            })}
          </select>
        </label>
        <Button variant="contained" color="primary" onClick={this.placeholder}>
          Placeholder
        </Button>
        <PostList
          handleDeletePost={this.handleDeletePost}
          handleAddReply={this.handleAddReply}
          posts={
            this.state.categorySelected == "all"
              ? this.props.posts
              : this.props.posts.filter(
                  post => post.category === this.state.categorySelected
                )
          }
          //posts={this.props.posts}
        />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
// PostListPage.need = [
//   () => {
//     return fetchPosts(this.props.users.sessionToken);
//   }
// ];

// Retrieve data from store as props
function mapStateToProps(state) {
  console.log(state);
  return {
    showAddPost: getShowAddPost(state),
    posts: getPosts(state),
    users: getUser(state)
  };
}

PostListPage.propTypes = {
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

PostListPage.contextTypes = {
  router: PropTypes.object
};

export default connect(mapStateToProps)(PostListPage);
