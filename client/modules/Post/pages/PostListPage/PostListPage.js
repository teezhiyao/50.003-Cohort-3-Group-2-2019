import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Import Components
import PostList from "../../components/PostList";
import PostCreateWidget from "../../components/PostCreateWidget/PostCreateWidget";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import style from "./PostListPage.css";


// Import Actions
import {
  addPostRequest,
  addPostUserRequest,
  fetchAllowedPosts,
  deletePostRequest,
  addReplyRequest,
  updatePostRequest,
  fetchPosts
} from "../../PostActions";
import { toggleAddPost } from "../../../App/AppActions";

// Import Selectors
import { getShowAddPost } from "../../../App/AppReducer";
import { getPosts } from "../../PostReducer";
import { getUser } from "../../UserReducer";

const styles = theme => ({
  root: {
    width: "100%"
  },

  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexBasis: "88.00%"
  }
});

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

class PostListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // posts: props.posts,
      categorySelected: "All Issues",
      categoryLabel:"All Issues",
      sortSelected: "recency",
      sortList: [
        { value: "recency", label: "Date" },
        { value: "alph", label: "Alphabetical" },
        { value: "priorityLevel", label: "Priority" }
      ],
      priorityList: [
        { value: "LOW", label: "LOW" },
        { value: "MEDIUM", label: "MEDIUM" },
        { value: "HIGH", label: "HIGH" }
      ],
      categoryList: [
        { label: "All Issues" },
        { label: "Login Issue" },
        { label: "API Issue" },
        { label: "Logout Issue" },
        { label: "Client Login Issue" },
        { label: "Data Logging Issue" },
        { label: "Feature Request" },
        { label: "Latency Issue" },
        { label: "Others" }

        // { value: "all", label: "All Issues" },
        // { value: "LOGINISSUE", label: "Login Issue" },
        // { value: "APIERROR", label: "API Issue" },
        // { value: "LOGOUTISSUE", label: "Logout Issue" },
        // { value: "Client Login Issue", label: "Client Login Issue" },
        // { value: "OTHERS", label: "Others" }
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
      this.props.dispatch(fetchAllowedPosts(this.props.users.sessionToken));
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
    console.log(this.state.sortSelected);
    // if (e.target.value === "alph") {
    if (e.target.value === "Alphabetical") {
      console.log("inside alph");
      // console.log(this.props.posts);
      this.props.posts.sort(dynamicSort("title"));
      // this.setState({posts: this.state.posts.sort(dynamicSort("title"))});
      console.log(this.state.posts);
      // console.log(this.state.sortSelected);
      // this.forceUpdate();
      // this.setState({ sortSelected: e.target.value });
      // this.props.dispatch(fetchAllowedPosts(this.props.users.sessionToken));
      // this.forceUpdate();
    }
    if (e.target.value === "Date") {
      console.log("inside recency");
      this.props.posts.sort(dynamicSort("dateCreated"));
      // this.setState({posts: this.state.posts.sort(dynamicSort("dateCreated"))});
      console.log(this.state.posts);
      // this.forceUpdate();
    }
    if (e.target.value === "Priority") {
      console.log("inside priority");
      this.props.posts.sort(dynamicSortPriority("priorityLevel"));
      // this.setState({posts: this.state.posts.sort(dynamicSortPriority("priorityLevel"))});
      console.log(this.state.posts);
      // this.forceUpdate();
    }
    
    // 
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
    const { classes } = this.props;
    console.log("rendering post list page");
    return (
      <div>  
        <PostCreateWidget
          className={style.postcreatewidget}
          addPost={this.handleAddPost}
          addUser={this.handleAddUser}
          showAddPost={this.props.showAddPost}
          categoryList={this.state.categoryList}
          priorityList={this.state.priorityList}
          handleNewCategory={this.handleNewCategory}
        />
          <p className={style.heading}>Your posts related to: "{this.state.categorySelected}"</p>

          <p className={style.sorting}>Issue Category</p>
          <select className={style.selecttext} onChange={this.handleSelectCategory} id="sortCategory">
            {this.state.categoryList.map(category => {
              return <option value={category.label}> {category.label} </option>;
            })}
          </select>


          <p className={style.sorting}>Sort By </p>
          <select className={style.selecttext} onChange={this.handleSort} id="priorityCategory">
            {this.state.sortList.map(category => {
              return <option value={category.label}> {category.label} </option>;
            })}
          </select>

          <ExpansionPanel>
            {/* <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}> */}
            <ExpansionPanelSummary>
              <Typography className={classes.secondaryHeading}>
                Issue Title
              </Typography>

              <Typography className={classes.secondaryHeading}>
                Created By
              </Typography>

              <Typography className={classes.secondaryHeading}>
                Created On
              </Typography>

              <Typography className={classes.secondaryHeading}>
                Priority
              </Typography>

              <Typography className={classes.secondaryHeading}>
                Category
              </Typography>
            
            </ExpansionPanelSummary>
          </ExpansionPanel>
        <PostList
          className = {style.postlist}
          handleDeletePost={this.handleDeletePost}
          handleAddReply={this.handleAddReply}
          handlePostUpdate={this.handlePostUpdate}
          posts={
            this.state.categorySelected == "All Issues"
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
  console.log(property);
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function(a, b) {
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      console.log("returning");
    return result * sortOrder;
  };
}
function dynamicSortPriority(property) {
  var sortOrder = 1;
  var dict = { HIGH: 1, MEDIUM: 2, LOW: 3 };

  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function(a, b) {
    var result =
      dict[a[property]] < dict[b[property]]
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
      imageData: PropTypes.string,
      dateCreated: PropTypes.string,
      priorityLevel: PropTypes.string
    })
  ),
  users: PropTypes.shape({
    name: PropTypes.string,
    userType: PropTypes.string,
    sessionToken: PropTypes.string.isRequired,
    objectId: PropTypes.string.isRequired
  }),
  showAddPost: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

PostListPage.contextTypes = {
  router: PropTypes.object
};

export default connect(mapStateToProps)(withStyles(styles)(PostListPage));
