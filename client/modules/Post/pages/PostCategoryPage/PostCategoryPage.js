import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

// Import Components
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";
import { Chip } from "@material-ui/core";
import PostListItem from "../../components/PostListItem/PostListItem";

import cssstyles from "./PostCategoryPage.css";

// Import Actions
import {
  fetchPosts,
  deletePostRequest,
  addReplyRequest
} from "../../PostActions";

// Import Selectors
import { getShowAddPost } from "../../../App/AppReducer";
import { getPosts } from "../../PostReducer";
import { getUser } from "../../UserReducer";

const styles = theme => ({
  root: {
    width: "100%"
  },
  numberingHeader: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "2.00%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexBasis: "88.00%"
  },
  miscHeading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "10.00%"
  }
});

class PostCategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorySelected: "LOGINISSUE"
    };
  }

  componentDidMount() {
    // this function is called the moment this component is rendered.
    console.log("This is PostCategoryPage");
    console.log(this.props);
    const category = this.props.params.category; // we have issue passing prop through link now
    this.setState({ categorySelected: category });
  }

  handleDeletePost = post => {
    // console.log(post);
    if (confirm("Do you want to delete this post")) {
      // eslint-disable-line
      this.props.dispatch(deletePostRequest(post));
    }
  };

  handleAddReply = (reply, cuid) => {
    // console.log('PostListPage log');
    // console.log((reply, cuid));
    this.props.dispatch(addReplyRequest({ reply, cuid }));
  };

  handleClick = () => {
    console.log(this.state);
  };

  render() {
    const { classes } = this.props;
    return (
      
      <div>
        <p className={cssstyles.title} id="individualCategory"> Facing a {this.state.categorySelected}? You are not alone. </p>
        
        {/* <h1>
          {" "}
          Displaying all Issue Threads related to
          <Chip
            label={this.state.categorySelected}
            onClick={this.handleClick}
          />
        </h1> */}

        {this.props.posts
          .filter(
            individualPost =>
              individualPost.category === this.state.categorySelected
          )
          .map((individualPost, index) => (
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.numberingHeader}>
                  {index + 1}
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {individualPost.title}
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  Category:
                  <Chip label={individualPost.category} />
                </Typography>
                {/* <Typography className={classes.miscHeading}>{"tags"}</Typography> */}
              </ExpansionPanelSummary>

              <PostListItem
                post={individualPost}
                key={individualPost.cuid}
                addReply={this.handleAddReply}
                onDelete={() => this.handleDeletePost(individualPost.objectId)}
              />
            </ExpansionPanel>
          ))}
      </div>
    );
  }
}

// Actions required to provide data for this component to render in server side.
PostCategoryPage.need = [
  () => {
    return fetchPosts();
  }
];

// Retrieve data from store as props
function mapStateToProps(state) {
  console.log(state);
  return {
    showAddPost: getShowAddPost(state),
    posts: getPosts(state),
    user: getUser(state)
  };
}

PostCategoryPage.propTypes = {
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
  user: PropTypes.shape({
    name: PropTypes.string,
    userType: PropTypes.string,
    sessionToken: PropTypes.string.isRequired,
    objectId: PropTypes.string.isRequired
  }),
  showAddPost: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object
};

PostCategoryPage.contextTypes = {
  router: PropTypes.object
};

export default connect(mapStateToProps)(withStyles(styles)(PostCategoryPage));
