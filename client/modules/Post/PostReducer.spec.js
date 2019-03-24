import test from 'ava';
import { reducerTest } from 'redux-ava';
import postReducer, { getPost, getPosts } from './PostReducer';
import { addPost, deletePost, addPosts } from './PostActions';

test('action for ADD_POST is working', reducerTest(
  postReducer,
  { data: ['init'] },
  addPost({
    username: 'Caleb',
    category: 'testing',
    resolveStatus: false,
    title: 'untitled',
    content: 'testing',
    cuid: 123,
    replyDataStructure: {}
  }),
  { data: [{
    username: 'Caleb',
    category: 'testing',
    resolveStatus: false,
    title: 'untitled',
    content: 'testing',
    cuid: 123,
    replyDataStructure: {}
  }, 'init'] },
));

test('action for DELETE_POST is working', reducerTest(
  postReducer,
  { data: [{
    username: 'Caleb',
    category: 'testing',
    resolveStatus: false,
    title: 'untitled',
    content: 'testing',
    cuid: 123,
    replyDataStructure: {}
  }] },
  deletePost('123'),
  { data: [] },
));

test('action for ADD_POSTS is working', reducerTest(
  postReducer,
  { data: [] },
  addPosts([
    {
        username: 'Caleb',
        category: 'testing',
        resolveStatus: false,
        title: 'untitled',
        content: 'testing',
        cuid: 123,
        replyDataStructure: {}
      },
  ]),
  { data: [{
    username: 'Caleb',
    category: 'testing',
    resolveStatus: false,
    title: 'untitled',
    content: 'testing',
    cuid: 123,
    replyDataStructure: {}
  }] },
));

test('getPosts selector', t => {
  t.deepEqual(
    getPosts({
      posts: { data: ['foo'] },
    }),
    ['foo']
  );
});

test('getPost selector', t => {
  t.deepEqual(
    getPost({
      posts: { data: [{ cuid: '123' }] },
    }, '123'),
    { cuid: '123' }
  );
});

