import test from 'ava';
import { actionTest } from 'redux-ava';

import {
  ADD_POST,
  DELETE_POST,
  ADD_POSTS,
  addPost,
  deletePost,
  addPosts,
} from './PostActions';

const post= {username: 'Caleb',category: 'testing',resolveStatus: false,title: 'untitled',content: 'testing',cuid: 123,replyDataStructure: {}};

test('should return the correct type for addPost', actionTest(
  addPost,
  post,
  { type: ADD_POST, post },
));

test('should return the correct type for deletePost', actionTest(
  deletePost,
  post.cuid,
  { type: DELETE_POST, cuid: post.cuid },
));

test('should return the correct type for addPosts', actionTest(
  addPosts,
  [post],
  { type: ADD_POSTS, posts: [post] },
));
