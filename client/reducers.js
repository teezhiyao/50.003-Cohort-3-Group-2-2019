/**
 * Root Reducer
 */
import { combineReducers } from "redux";

// Import Reducers
import app from "./modules/App/AppReducer";
import posts from "./modules/Post/PostReducer";
import intl from "./modules/Intl/IntlReducer";
import replies from "./modules/Post/RepliesReducer";
import user from "./modules/Post/UserReducer";

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  posts,
  replies,
  user,
  intl
});
