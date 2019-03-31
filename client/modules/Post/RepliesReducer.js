import { ADD_REPLIES } from "./PostActions";

// Initial State
const initialState = { data: [] };

const RepliesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REPLIES:
      return {
        data: action.replies
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getReplies = (state, postId) => state.replies.data;

// Export Reducer
export default RepliesReducer;
