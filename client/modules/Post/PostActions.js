import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const ADD_USER = 'ADD_USER';
export const ADD_REPLY = 'ADD_REPLY';

// Export Actions
export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function addPostRequest(post) {
  return (dispatch) => {
    return callApi('posts', 'post', {
      post: {
        name: post.name,
        title: post.title,
        content: post.content,
      },
    }).then(res => dispatch(addPost(res.post)));
  };
}

export function addUser(post) {
  return {
    type: ADD_USER,
    post,
  };
}

export function addPostUserRequest(post) {
  return (dispatch) => {
    return callApi('userPosts', 'post', {
      post: {
        name: post.name,
        title: post.title,
        content: post.content,
      },
    }).then(res => dispatch(addUser(res.post)));
  };
}


export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts,
  };
}

export function fetchPosts() {
  return (dispatch) => {
    return callApi('posts').then(res => {
      dispatch(addPosts(res.posts));
    });
  };
}

export function fetchPost(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`).then(res => dispatch(addPost(res.post)));
  };
}

export function addReply(reply) {
  return {
    type: ADD_REPLY,
    reply,
  };
}

export function addReplyRequest(reply) {
  return (dispatch) => {
    return callApi('replies', 'post', {
      reply: {
        reply: reply.reply,
        cuid: reply.cuid,
      },
    }).then(res => dispatch(addReply(res.reply)));
  };
}

export function deletePost(cuid) {
  return {
    type: DELETE_POST,
    cuid,
  };
}

export function deletePostRequest(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`, 'delete').then(() => dispatch(deletePost(cuid)));
  };
}
