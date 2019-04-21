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
  addReplyRequest,
  updatePostRequest
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
      sortSelected: "recency",
      sortList: [
        { value: "recency", label: "Date" },
        { value: "alph", label: "Alphabetical" },
        { value: "priority", label: "Priority" }
      ],
      categoryList: [
        { value: "all", label: "All Issues" },
        { value: "LOGINISSUE", label: "Login Issue" },
        { value: "APIERROR", label: "API Issue" },
        { value: "LOGOUTISSUE", label: "Logout Issue" },
        { value: "Client Login Issue", label: "Client Login Issue" },
        { value: "OTHERS", label: "Others" }
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

  handleAddPost = (category, title, content, imageData, priorityLevel) => {
    console.log("Maybe here");
    this.props.dispatch(toggleAddPost());
    this.props.dispatch(
      addPostRequest(
        this.props.users.username,
        title,
        content,
        category,
        imageData,
        priorityLevel,
        this.props.users.objectId
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

  handlePostUpdate = postUpdate => {
    console.log("PostUpdate log");
    postUpdate["sessionToken"] = this.props.users.sessionToken;
    console.log(postUpdate);
    this.props.dispatch(updatePostRequest(postUpdate));
  };

  handleSelectCategory = e => {
    this.setState({ categorySelected: e.target.value });
    console.log(this.state);
  };
  handleSort = e => {
    console.log("inside handlesort");
    this.setState({ sortSelected: e.target.value });
    console.log(this.sortSelected);
    if (e.target.value === "alph") {
      console.log("inside alph");
      console.log(this.props.posts);
      this.props.posts.sort(dynamicSort("title"));
      console.log(this.props.posts);
    }
    if (e.target.value === "recency") {
      console.log("inside recency");
      this.props.posts.sort(dynamicSort("createdAt"));
      console.log(this.props.posts);
    }
    if (e.target.value === "priority") {
      console.log("inside priority");
      this.props.posts.sort(dynamicSortPriority("priority"));
      console.log(this.props.posts);
    }
    // console.log(this.state);
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
        <label>
          {" "}
          Sort By
          <select onChange={this.handleSort}>
            {this.state.sortList.map(category => {
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
          handlePostUpdate={this.handlePostUpdate}
          posts={
            this.state.categorySelected == "all"
              ? // ? this.props.posts.sort(dynamicSort("title"))
                this.props.posts
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

function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function(a, b) {
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}
function dynamicSortPriority() {
  var sortOrder = 1;
  var dict = { HIGH: 3, MEDIUM: 2, LOW: 1 };

  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function(a, b) {
    var result =
      dict[a[priority]] < dict[b[property]]
        ? -1
        : dict[a[property]] > dict[b[property]]
        ? 1
        : 0;
    return result * sortOrder;
  };
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
