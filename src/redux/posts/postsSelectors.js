import { createSelector } from '@reduxjs/toolkit';
import { selectUserId } from '../auth/authSelectors';

export const selectPosts = state => state.posts;

export const selectPostsByOwner = createSelector(
  [selectPosts, selectUserId],
  (posts, uid) => {
    return posts.filter(post => post.authorID === uid);
  }
);

export const selectPostByID = id => state => {
  const post = state.posts.find(postItem => postItem.id === id);
  return post ? post : null;
};
