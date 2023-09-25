import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostsScreen from '../Screens/PostsScreen';
import CreatePostsScreen from '../Screens/CreatePostsScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import LogOutBtn from './LogOutBtn';
import HeaderTitle from './HeaderTitle';
import SvgSprite from '../images/SvgSprite';

const Tab = createBottomTabNavigator();

const TabNavigation = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        height: 83,
        paddingLeft: 42,
        paddingRight: 42,
        paddingTop: 9,
        borderTopWidth: 1,
      },
    }}
  >
    <Tab.Screen
      name="Posts"
      component={PostsScreen}
      options={{
        headerTitle: () => <HeaderTitle title="Публікації" />,
        headerRight: () => <LogOutBtn />,
        headerStyle: {
          borderBottomWidth: 1,
        },
        tabBarIcon: () => <SvgSprite name="grid" />,
        tabBarLabel: '',
      }}
    ></Tab.Screen>
    <Tab.Screen
      name="CreatePosts"
      component={CreatePostsScreen}
      options={{
        tabBarIcon: () => <SvgSprite name="new" />,
        tabBarLabel: '',
      }}
    ></Tab.Screen>
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: () => <SvgSprite name="user" />,
        tabBarLabel: '',
      }}
    ></Tab.Screen>
  </Tab.Navigator>
);

export default TabNavigation;
