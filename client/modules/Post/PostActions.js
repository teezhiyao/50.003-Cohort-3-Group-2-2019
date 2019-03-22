import callApi from "../../util/apiCaller";

// Export Constants
export const ADD_POST = "ADD_POST";
export const ADD_POSTS = "ADD_POSTS";
export const DELETE_POST = "DELETE_POST";
export const ADD_USER = "ADD_USER";
export const ADD_REPLY = "ADD_REPLY";
export const ADD_REPLYS = "ADD_REPLYS";

// Export Actions
export function addPost(post) {
  return {
    type: ADD_POST,
    post
  };
}

export function addPostRequest(post) {
  return dispatch => {
    return callApi("postNewPost", "post", {
      post: {
        username: post.username,
        category: post.category,
        resolveStatus: post.resolveStatus,
        title: post.title,
        content: post.content,
        cuid: post.cuid,
        replyDataStructure: post.replys
      }
    }).then(res => dispatch(addPost(res.post)));
  };
}

export function addUser(post) {
  return {
    type: ADD_USER,
    post
  };
}

export function addPostUserRequest(post) {
  console.log("addpostuserrequest");
  return dispatch => {
    return callApi("userPosts", "post", {
      post: {
        name: post.name,
        title: post.title,
        content: post.content
      }
    }).then(res => dispatch(addUser(res.post)));
  };
}

export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts
  };
}

export function fetchPosts() {
  return dispatch => {
    return callApi("queryAllPost").then(res => {
      dispatch(addPosts(res.posts.results));
    });
  };
}

export function fetchPost(objectId) {
  return dispatch => {
    console.log("fetch 1 post");
    console.log(objectId);

    return callApi(`posts/${objectId}`).then(function(value) {
      console.log("print value");
      console.log(value);
      value => dispatch(addPost(value));
    });
  };
}

export function addReply(reply) {
  return {
    type: ADD_REPLY,
    reply
  };
}

export function addReplyRequest(reply) {
  return dispatch => {
    return callApi("replies", "post", {
      reply: {
        reply: reply.reply,
        cuid: reply.cuid
      }
    }).then(res => dispatch(addReply(res.reply)));
  };
}

export function deletePost(cuid) {
  return {
    type: DELETE_POST,
    cuid
  };
}

export function deletePostRequest(cuid) {
  return dispatch => {
    return callApi(`posts/${cuid}`, "delete").then(() =>
      dispatch(deletePost(cuid))
    );
  };
}

// export function addReplys(replys) {
//   return {
//     type: ADD_REPLYS,
//     replys
//   };
// }

// export function fetchReplys() {
//   return dispatch => {
//     return callApi('replys').then(res => {
//       dispatch(addReplys(res.replys));
//     });
//   };
// }

export function fetchReply(cuid) {
  return dispatch => {
    return callApi(`replies/${cuid}`).then(res =>
      dispatch(addReply(res.reply))
    );
  };
}

// export function addEmail(email) {
//   return {
//     type: Email,
//     email
//   };
// }

// export function email() {
//   return dispatch => {
//     return callApi("email").then(res => {
//       dispatch(addEmail(res.replys));
//     });
//   };
// }
