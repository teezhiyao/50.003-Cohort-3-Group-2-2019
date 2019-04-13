import { ADD_REPLIES, ADD_REPLY, DELETE_REPLY } from "./PostActions";

// Initial State
const initialState = { data: [] };

const RepliesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REPLIES:
      return {
        data: action.replies
      };
    case ADD_REPLY:
      return {
        data: [...state.data, action.replies]
      };
    case DELETE_REPLY:
      return {
        data: state.data.filter(replies => replies.objectId !== action.objectId)
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
