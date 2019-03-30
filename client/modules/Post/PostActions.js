import callApi from "../../util/apiCaller";

// Export Constants
export const ADD_POST = "ADD_POST";
export const ADD_POSTS = "ADD_POSTS";
export const DELETE_POST = "DELETE_POST";
export const ADD_USER = "ADD_USER";
export const ADD_REPLY = "ADD_REPLY";
export const ADD_REPLIES = "ADD_REPLIES";

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
        username: post.name,
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

export function emailCall(post) {
  return dispatch => {
    return callApi("email", "post", {
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

    return callApi(`posts/${objectId}`).then(res => {
      dispatch(addPost(res.post));
    });
  };
}

export function deletePost(objectId) {
  return {
    type: DELETE_POST,
    objectId
  };
}

export function deletePostRequest(objectId) {
  return dispatch => {
    return callApi(`posts/${objectId}`, "delete").then(() =>
      dispatch(deletePost(objectId))
    );
  };
}

export function addReply(replies) {
  return {
    type: ADD_REPLY,
    replies
  };
}

export function addReplies(replies) {
  return {
    type: ADD_REPLIES,
    replies
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

export function fetchReplies(postId) {
  return dispatch => {
    return callApi(`queryReplies/${postId}`).then(res =>
      dispatch(addReplies(res.replies.results))
    );
  };
}

export function tryLogin(username, password) {
  return dispatch => {
    return callApi(
      `userLogin/${username}/${password}`
      // , "get", {
      //   // user: {
      //   //   username: username,
      //   //   password: password
      //   // }
      // }
    ).then(res => dispatch(addPost(res.post)));
  };
}

// export function fetchPost(objectId) {
//   return dispatch => {
//     console.log("fetch 1 post");
//     console.log(objectId);

//     return callApi(`posts/${objectId}`).then(res => {
//       dispatch(addPost(res.post));
//     });
//   };
// }
