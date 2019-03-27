import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { graphql } from 'react-apollo';
import { compose, mapProps, branch, renderComponent } from 'recompose';

import { GET_POSTS } from 'graphql/user/queries';

import './App.scss';

const App = compose(
  graphql(GET_POSTS, { name: 'getPosts' }),
  mapProps(({ getPosts: { posts } }) => ({ posts })),
  branch(
    ({ posts }) => !Boolean(posts),
    renderComponent(() => <div>Loading...</div>),
  ),
)(({ posts }) => (
  <ul>
    <h1 className="title">Welcome to MiMi</h1>
    {posts.map(({ author, title, votes }, i) => (
      <li key={i}>
        <p>{author.firstName}</p>
        <p>{author.lastName}</p>
        <p>{title}</p>
        <span>{votes}</span>
      </li>
    ))}
  </ul>
));

export default hot(App);
