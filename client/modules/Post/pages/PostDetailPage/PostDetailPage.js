import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { FormattedMessage } from "react-intl";

// Import Style
import styles from "../../components/PostListItem/PostListItem.css";

import PostListItem from "../../components/PostListItem/PostListItem";
import ReplyList from "../../components/ReplyList";

// Import ActionsY
import { fetchPosts, fetchPost, fetchReplies } from "../../PostActions";

// Import Selectors
import { getPost, getPosts } from "../../PostReducer";
import { getReplies } from "../../RepliesReducer";

//TO DO
//CREATE LINK BACK TO MAINPAGE
//CREATE THREAD OF REPLIES
//RESOLVE STATUS INDICATION
//AND RESOLVE STATUS TOGGLE

class PostDetailPage extends Component {
  componentDidMount() {
    // this.props.dispatch(fetchPosts());
    this.props.dispatch(fetchPost(this.props.post.objectId));
    this.props.dispatch(fetchReplies());
  }

  handleDeletePost = post => {
    if (confirm("Do you want to delete this post")) {
      this.props.dispatch(deletePostRequest(post));
    }
  };

  handleAddReply = (reply, cuid) => {
    this.props.dispatch(addReplyRequest({ reply, cuid }));
  };

  render() {
    return (
      <div>
        {/* <Helmet title={this.props.post.title} />
        <div className={`${styles["single-post"]} ${styles["post-detail"]}`}>
          <h3 className={styles["post-title"]}>{this.props.post.title}</h3>
          <p className={styles["author-name"]}>
            <FormattedMessage id="by" /> {this.props.post.userName}
          </p>
          <p className={styles["post-desc"]}>{this.props.post.content}</p>
          <p className="ResolveStatus">{this.props.post.resolveStatus}</p>
          <p className="date">{this.props.post.dateAdded}</p> */}

        <PostListItem
          post={this.props.post}
          key={this.props.post.objectId}
          addReply={this.handleAddReply}
          onDelete={() => this.handleDeletePost(this.props.post.objectId)}
        />
        <ReplyList
          handleDeletePost={this.handleDeletePost}
          handleAddReply={this.handleAddReply}
          replies={this.props.replies}
        />
      </div>
      // </div>
    );
  }
}

// Actions required to provide data for this component to render in server side.
PostDetailPage.need = [
  params => {
    return fetchPost(params.objectId);
  }
];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  console.log("Mapping here");
  console.log(state.replies);
  // props.post = getPost(state, props.params.objectId);
  // console.log(props.post);

  return {
    post: getPost(state, props.params.objectId),
    replies: getReplies(state)
  };
}

PostDetailPage.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string.isRequired,
    objectId: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string,
    reply: PropTypes.string
  }),
  replies: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      content: PropTypes.string.isRequired,
      objectId: PropTypes.string.isRequired,
      postId: PropTypes.string.isRequired
    })
  ),
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(PostDetailPage);

//import React from 'react';

// const PostDetailPage = () =>{
//     //console.log('inside contact page');
//     return(
//         <div>
//             <div className='container'>
//                 <h4 className='center'>Contact</h4>
//                 <p>lorem ipsum Contact Contact Contact</p>
//             </div>
//         </div>
//     )
// }

// export default PostDetailPage;

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import Helmet from 'react-helmet';
// import { FormattedMessage } from 'react-intl';

// // // Import Style
// // import styles from '../../components/PostListItem/PostListItem.css';

// // Import Actions
// import {
//   addPostRequest,
//   addReplyRequest,
//   fetchPost,
//   fetchReply
// } from '../../PostActions';

// // // Import Selectors
// import { getShowAddPost } from '../../../App/AppReducer';
// import { getPosts } from '../../PostReducer';

// class PostDetailPage extends Component {
// //   componentDidMount() {
// //     this.props.dispatch(fetchReplys());
// //   }

// //pass cuid to post detail page

// //get post
// //get replies
// //add replies

//   componentDidMount() {
//     console.log(this.props.post.cuid);
//     this.props.dispatch(fetchPost(this.props.post.cuid));
//   }

// //   handleAddPost = (name, title, content) => {
// //     this.props.dispatch(toggleAddPost());
// //     this.props.dispatch(addPostRequest({ category, title, content }));
// //   };

// //   handleAddUser = (name, title, content) => {
// //     this.props.dispatch(toggleAddPost());
// //     this.props.dispatch(addPostUserRequest({ name, title, content }));
// //   };
//   handleAddReply = (reply, cuid) => {
//     // console.log('PostListPage log');
//     // console.log((reply, cuid));
//     this.props.dispatch(addReplyRequest({ reply, cuid }));
//   };
//   render() {
//     console.log(this.props.post.cuid);
//     return (
//       <div>
//         <PostCreateWidget
//           addPost={this.handleAddPost}
//           addUser={this.handleAddUser}
//           showAddPost={this.props.showAddPost}
//         />

// //         <Helmet title={this.props.post.title} />
// //         <div className={['post-detail']}>
// //           <h3 className={['post-title']}>{this.props.post.title}</h3>
// //           <p className={['author-name']}>
// //             <FormattedMessage id='by' /> {this.props.post.name}
// //           </p>
// //           <p className={['post-desc']}>{this.props.post.content}</p>
// //         </div>
// //         <ReplyList replys={this.props.replys} />
// //       </div>
//     );
//   }
// }

// // Actions required to provide data for this component to render in server side.
// // PostDetailPage.need = [
// //     () => {
// //     return fetchPost(propTypes.post.cuid);
// //   }
// // ];

// // // // Retrieve data from store as props
// // function mapStateToProps(state, propTypes) {
// //   console.log.state;
// //   return {
// //     post: getPost(state, state.cuid)
// //   };
// // }
// PostDetailPage.need = [
//     () => {
//       return fetchPosts();
//     }
//   ];

//   // Retrieve data from store as props
//   function mapStateToProps(state) {
//     // console.log(state);
//     return {
//       showAddPost: getShowAddPost(state),
//       posts: getPosts(state)
//     };
//   }

// // PostDetailPage.need = [
// //   params => {
// //     return fetchReplys();
// //   }
// // ];

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
// //export default PostDetailPage;
