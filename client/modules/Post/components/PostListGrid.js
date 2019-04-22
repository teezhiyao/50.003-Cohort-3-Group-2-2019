import React, { Component } from "react";
import PropTypes from "prop-types";

// Import Components
import PostGridItem from "./PostGridItem/PostGridItem";
import { Link } from "react-router";
import addReply from "./PostListItem/PostListItem";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";
import { Chip } from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import { isNullOrUndefined } from "util";

const styles = {
  gridList: {
    width: 270,
    height: 350,
    float: "left",
    // border: '1px solid #ddd',
    // padding: '15px',
    marginInlineEnd: "15px",
    marginInlineStart: "15px",
    margin: "15px",
    paddingTop: "10px",
    marginTop: "15px"
  },
  div: {
    width: 300,
    height: 450,
    float: "left",
    padding: "15px",
    marginInlineEnd: "15px",
    marginInlineStart: "15px",
    margin: "15px",
    border: "1px solid #ddd"
  },
  header: {
    margin: "auto",
    width: 270,
    paddingTop: "15px",
    paddingBottom: "15px",
    paddingRight: "15px",
    paddingLeft: "15px",
    fontFamily: "Helvetica-Light",
    fontSize: "28px",
    paddingTop: "15px",
    textAlign: "center",
    backgroundColor: "#191b33",
    color: "white"

  },
  gridTile: {
    height: "200",
    width: "100%",
    padding: "5px"
  }
};

//takes in props(all posts) and displays every post
class PostListGrid extends Component {
  handleClickChip = () => {
    console.log("clicked chip");
  };

  render() {
    const { classes } = this.props;
    console.log("postlistgrid");
    // console.log(this.props.posts[0].category);
    return (
      <div className={classes.div}>
        <div class="w3-card-4">
          <p class="w3-card-4" className={classes.header}>
            {this.props.posts[0].category}
          </p>
        </div>
        {/* <p class="w3-card-4" >{this.props.posts[0].category}</p> */}
        {/* NEED TO HANDLE UNDEFINED EXCEPTION */}
        <GridList className={classes.gridList}>
          {this.props.posts.map((individualPost, index) => (
            <GridListTile cols={2}>
              <PostGridItem
                post={individualPost}
                key={individualPost.cuid}
                addReply={this.props.handleAddReply}
                onDelete={() =>
                  this.props.handleDeletePost(individualPost.objectId)
                }
              />
              {/* <GridListTileBar title={individualPost.createdAt} /> */}
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

PostListGrid.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      objectId: PropTypes.string.isRequired,
      slug: PropTypes.string,
      cuid: PropTypes.string,
      reply: PropTypes.string,
      category: PropTypes.string
    })
  ),
  handleDeletePost: PropTypes.func.isRequired,
  handleAddReply: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostListGrid);
