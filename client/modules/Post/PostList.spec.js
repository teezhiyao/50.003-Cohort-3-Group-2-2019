import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import PostList from './components/PostList';

const posts = [
  {
    username: 'Caleb',
    category: 'testing',
    resolveStatus: false,
    title: 'untitled',
    content: 'testing',
    cuid: 123,
    replyDataStructure: {}
  },
  {
    username: 'Nash',
    category: 'testing again',
    resolveStatus: false,
    title: 'untitled again',
    content: 'testing again',
    cuid: 321,
    replyDataStructure: {}
  },
];

test('renders the list', t => {
  const wrapper = shallow(
    <PostList posts={posts} handleShowPost={() => {}} handleDeletePost={() => {}} />
  );

  t.is(wrapper.find('PostListItem').length, 2);
});
