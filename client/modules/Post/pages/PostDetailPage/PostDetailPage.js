// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import Helmet from "react-helmet";
// import { FormattedMessage } from "react-intl";

// // Import Style
// import styles from "../../components/PostListItem/PostListItem.css";

// // Import Actions
// import {
//   addPostRequest,
//   addPostUserRequest,
//   fetchPost,
//   fetchReplys
// } from "../../PostActions";
// import { toggleAddPost } from "../../../App/AppActions";

// // Import Selectors
// import { getPost } from "../../PostReducer";

// class PostDetailPage extends Component {
//   componentDidMount() {
//     this.props.dispatch(fetchReplys());
//   }

//   handleAddPost = (name, title, content) => {
//     this.props.dispatch(toggleAddPost());
//     this.props.dispatch(addPostRequest({ name, title, content }));
//   };

//   handleAddUser = (name, title, content) => {
//     this.props.dispatch(toggleAddPost());
//     this.props.dispatch(addPostUserRequest({ name, title, content }));
//   };
//   render() {
//     return (
//       <div>
//         <PostCreateWidget
//           addPost={this.handleAddPost}
//           addUser={this.handleAddUser}
//           showAddPost={this.props.showAddPost}
//         />

//         <Helmet title={this.props.post.title} />
//         <div className={`${styles["single-post"]} ${styles["post-detail"]}`}>
//           <h3 className={styles["post-title"]}>{this.props.post.title}</h3>
//           <p className={styles["author-name"]}>
//             <FormattedMessage id="by" /> {this.props.post.name}
//           </p>
//           <p className={styles["post-desc"]}>{this.props.post.content}</p>
//         </div>
//         <ReplyList replys={this.props.replys} />
//       </div>
//     );
//   }
// }

// // Actions required to provide data for this component to render in server side.
// PostDetailPage.need = [
//   params => {
//     return fetchPost(params.cuid);
//   }
// ];

// // Retrieve data from store as props
// function mapStateToProps(state, props) {
//   console.log.state;
//   return {
//     post: getPost(state, props.params.cuid)
//   };
// }

// PostDetailPage.need = [
//   params => {
//     return fetchReplys();
//   }
// ];

// PostDetailPage.propTypes = {
//   replys: PropTypes.arrayOf(
//     PropTypes.shape({
//       reply: PropTypes.string.isRequired
//     })
//   ),
//   post: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     content: PropTypes.string.isRequired,
//     slug: PropTypes.string.isRequired,
//     cuid: PropTypes.string.isRequired
//   }).isRequired,
//   dispatch: PropTypes.func.isRequired
// };

// PostDetailPage.contextTypes = {
//   router: PropTypes.object
// };

// export default connect(mapStateToProps)(PostDetailPage);
