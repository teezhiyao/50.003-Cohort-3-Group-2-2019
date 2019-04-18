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
      categorySelected: "all",
      categoryList: [
        { value: "all", label: "All Issues" },
        { value: "LOGINISSUE", label: "Login Issue" },
        { value: "APIERROR", label: "API Issue" },
        { value: "LOGOUTISSUE", label: "Logout Issue" },
        { value: "Client Login Issue", label: "Client Login Issue" }
      ]
    };
  }

  componentDidMount() {
    // this function is called the moment this component is rendered.
    console.log("componentDidMount");
    console.log(this.state);
  }

  handleDeletePost = post => {
    console.log("In handle delete post");
    console.log(post);
    if (confirm("Do you want to delete this post")) {
      // eslint-disable-line
      this.props.dispatch(
        deletePostRequest(post, this.props.users.sessionToken)
      );
    }
  };

  handleAddPost = (category, title, content, imageData) => {
    console.log("Maybe here");
    this.props.dispatch(toggleAddPost());
    this.props.dispatch(
      addPostRequest(
        this.props.users.username,
        title,
        content,
        category,
        imageData
      )
    );
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

  handleNewCategory = newCategory => {
    //this.setState({categoryList : [...this.state.categoryList,{value:{newCategory}, label:{newCategory} }]});
    this.setState(state => {
      const categoryList = [
        ...state.categoryList,
        { value: { newCategory }, label: { newCategory } }
      ];
      return {
        categorySelected: "all",
        categoryList
      };
    });
    console.log(this.state.categoryList);
  };

  render() {
    return (
      <div>
        <PostCreateWidget
          addPost={this.handleAddPost}
          addUser={this.handleAddUser}
          showAddPost={this.props.showAddPost}
          categoryList={this.state.categoryList}
          handleNewCategory={this.handleNewCategory}
        />
        <label>
          {" "}
          Issue Category
          <select onChange={this.handleSelectCategory}>
            {this.state.categoryList.map(category => {
              return <option value={category.value}> {category.label} </option>;
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
      url: PropTypes.state,
      imageData: PropTypes.string
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
