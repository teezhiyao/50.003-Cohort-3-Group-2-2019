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

// Get User
export const getUser = state => state.user.data;

// Export Reducer
export default UserReducer;
