import React from 'react';
import { Text } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import { View } from 'react-native';
import User from '../componets/User';
import PostList from '../componets/PostList';
import { ScrollView } from 'react-native';

const PostsScreen = () => {
  return (
    <ScrollView>
      <View style={GlobalStyles.container}>
        <User />
        <PostList />
      </View>
    </ScrollView>
  );
};

export default PostsScreen;
