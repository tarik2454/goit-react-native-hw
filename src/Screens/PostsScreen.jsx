import React from 'react';
import { Text } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import { View } from 'react-native';
import User from '../componets/User';
import PostItem from '../componets/PostItem';

const PostsScreen = () => {
  return (
    <View style={GlobalStyles.container}>
      <User />
      <PostItem />
    </View>
  );
};

export default PostsScreen;
