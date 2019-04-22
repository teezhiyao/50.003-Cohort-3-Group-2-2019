import PropTypes from "prop-types";
import { Link } from "react-router";
import React, { Component } from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
// Import Style
import styles from "./PostGridItem.css";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Chip } from "@material-ui/core";



import DeleteIcon from "@material-ui/icons/Delete";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

export class PostGridItem extends Component {
  state = {
    resolve: false
  };
  addReply = () => {
    // console.log('postlistitem');
    const replyRef = this.refs.replyText;
    if (replyRef.value) {
      this.props.addReply(replyRef.value, this.props.post.cuid);
      replyRef.value = "";
    }
  };

  handleChange = name => event => {
    console.log(name);
    console.log(event.target.checked);
    this.setState({ [name]: event.target.checked });
  };

  render() {
    return (
      <Card style={{ height: "250" }}>
        <CardContent style={{ height: "250" }}>
          <div>
            <span style={{ float: "right" }} className={styles["post-action"]}>
              {/* <FormControlLabel
              control={
                <Switch
                  checked={this.state.resolve}
                  onChange={this.handleChange("resolve")}
                  color="primary"
                />
              }
              label={this.state.resolve ? "Resolved" : "Unresolved"}
            /> */}
              <span href="#" align="right" onClick={this.props.onDelete}>
                <DeleteIcon id="deletePost" />
              </span>
            </span>
          </div>
          <div>
            <h3 className={styles["post-title"]}>
              <Link to={`/posts/${this.props.post.objectId}`}>
                {this.props.post.title}
                {/* <PostDetailPage post={this.props.post} /> */}
              </Link>
            </h3>
            {/* <p>{this.props.post.category}</p> */}
            {/* <p className={styles["author-name"]}>
            <FormattedMessage /> {this.props.post.category}
            <Link to={
                    `/cat/${individualPost.category}`
                    }>
                    <Chip label={individualPost.category} onClick= {this.handleClickChip}>  
                    </Chip>
            </Link>
          </p> */}
            <span className={styles["post-desc"]}>
            <table class="w3-table" >
                    <tr className={styles["tr"]}>
                    <td className={styles["td1"]}>Priority Level</td>
                    <td className={styles["td"]}>{this.props.post.priorityLevel}</td>
                    </tr>
                    <tr className={styles["tr"]}>
                    <td  className={styles["td1"]}>Created At</td>
                    <td className={styles["td"]}>{this.props.post.dateCreated.substring(0, 16)}</td>
                    </tr>
            
            
            </table>
              {/* Priority Level : {this.props.post.priorityLevel} <br></br> */}
              {/* Created At : {this.props.post.dateCreated.substring(0, 16)}<br></br> */}
              
              <div className={styles["div1"]}>
                { this.props.post.resolveStatus
                  ? <Chip  label="Resolved"/>
                  : <Chip  label="Unresolved"/>
                }
              </div>
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }
}

PostGridItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string,
    cuid: PropTypes.string,
    objectId: PropTypes.string.isRequired,
    reply: PropTypes.string
  }),
  // addReply: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  addReply: PropTypes.func
};
export default injectIntl(PostGridItem);

// export default PostListItem;
