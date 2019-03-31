import { ADD_USER } from "./PostActions";

// Initial State
const initialState = { data: [] };

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        data: action.user
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getUser = (state, postId) => state.user.data;

// Export Reducer
export default UserReducer;
