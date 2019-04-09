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
  // this is a Redux action creator
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
    }).then(res => dispatch(addPost(res)));
    // dispatch updates the store by adding the action
    // actions describe what happens but don't describe how the app changes
    // reducers specify how the app's state changes in response to the actions sent
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

export function addUser(user) {
  return {
    type: ADD_USER,
    user
  };
}

export function createUser(user) {
  console.log("Create User");
  console.log(user.username);
  return dispatch => {
    return callApi("createUser", "post", {
      user: {
        username: user.username,
        password: user.password,
        email: user.email,
        name: user.name,
        age: user.age
      }
    }).then(res => res);
  };
}

export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts
  };
}

export function fetchAllowedPosts(sessionToken) {
  console.log("fetching Allowed post");
  return dispatch => {
    return callApi(`queryAllowedPost/${sessionToken}`).then(res => {
      dispatch(addPosts(res.posts.results));
    });
  };
}

export function fetchPosts() {
  console.log("fetching post");
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

export function addReplyRequest(reply, postId) {
  return dispatch => {
    console.log("In addReplyRequest");
    console.log(reply);
    console.log(postId);
    return callApi("postNewReply", "post", {
      reply: {
        content: reply,
        postId: postId
      }
    }).then(res => dispatch(addReply(res)));
  };
}

export function fetchReplies(postId) {
  return dispatch => {
    return callApi(`queryReplies/${postId}`).then(res =>
      dispatch(addReplies(res.replies.results))
    );
  };
}

export function fetchLogin(username, password) {
  return dispatch => {
    return callApi(`userLogin/${username}/${password}`).then(res =>
      // dispatch(addUser(res.user)).then(res => console.log(res))
      dispatch(addUser(res.user))
    );
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
