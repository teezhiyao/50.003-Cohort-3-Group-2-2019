import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import {BrowserRouter, Route} from 'react-router-dom';

// Import Style
import styles from '../../components/PostListItem/PostListItem.css';

import {PostListPage} from '../PostListPage/PostListPage';

// Import Actions
import { fetchPost } from '../../PostActions';

// Import Selectors
import { getPost } from '../../PostReducer';
//TO DO
//CREATE LINK BACK TO MAINPAGE
//CREATE THREAD OF REPLIES
//RESOLVE STATUS INDICATION
//AND RESOLVE STATUS TOGGLE
export function PostDetailPage(props) {
  return (
    
    <div>
     
      <Helmet title={props.post.title} />
      <div className={`${styles['single-post']} ${styles['post-detail']}`}>
      
        <h3 className={styles['post-title']}>{props.post.title}</h3>
        <p className={styles['author-name']}><FormattedMessage id='by' /> {props.post.name}</p>
        <p className={styles['post-desc']}>{props.post.content}</p>
        <p className='REPLIES'>{props.post.replyscuid}</p>
        <p className='ResolveStatus'>{props.post.resolveStatus}</p>
        <p className='date'>{props.post.dateAdded}</p>
        {/* <h3 className={styles['post-title']}>
            <Link to={`/`}>
              Back to Home Page
              
            </Link>
          </h3> */}
      </div>
    </div>
    
  );
}

// Actions required to provide data for this component to render in server side.
PostDetailPage.need = [params => {
  return fetchPost(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    post: getPost(state, props.params.cuid),
  };
}

PostDetailPage.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    replyscuid: PropTypes.array,
    resolveStatus: PropTypes.bool,
    dateAdded: PropTypes.string
  }).isRequired,
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