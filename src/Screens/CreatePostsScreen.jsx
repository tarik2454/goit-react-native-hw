import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native';
import User from '../componets/User';
import PostList from '../componets/PostList';
import GlobalStyles from '../styles/GlobalStyles';

const CreatePostsScreen = () => {
  return (
    <View>
      <View style={GlobalStyles.container}>
        <User />
        <PostList />
      </View>
    </View>
  );
};

export default CreatePostsScreen;
