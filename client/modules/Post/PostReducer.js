import { ADD_POST, ADD_POSTS, DELETE_POST } from "./PostActions";

// Initial State
const initialState = { data: [] };

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        data: [action.post, ...state.data]
      };

    case ADD_POSTS:
      return {
        data: action.posts
      };
    case DELETE_POST:
      const newlst = state.data.filter(
        post => post.objectId !== action.objectId
      );
      console.log("Logging in delete post");
      console.log(newlst);
      return {
        data: newlst
      };

    default:
      console.log("In default return state");

      return state;
  }
};

/* Selectors */

// Get all posts
export const getPosts = state => state.posts.data;

// Get post by objectId
export const getPost = (state, objectId) =>
  state.posts.data.filter(post => post.objectId === objectId)[0];

// state.posts.data.filter(post => post.objectId === objectId)[0];

// Export Reducer
export default PostReducer;
