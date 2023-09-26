import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import PostsScreen from '../Screens/PostsScreen';
import HeaderTitle from './HeaderTitle';
import LogOutBtn from './LogOutBtn';
import SvgSprite from '../images/SvgSprite';
import ProfileScreen from '../Screens/ProfileScreen';
import CreatePostsScreen from '../Screens/CreatePostsScreen';
import { Pressable } from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <>
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
            headerTitle: () => (
              <HeaderTitle
                title="Публікації"
                margin={{ left: '37%', right: '15%' }}
              />
            ),
            headerRight: () => (
              <Pressable style={{ marginRight: 16 }} onPress={() => {}}>
                <LogOutBtn />
              </Pressable>
            ),
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
            headerTitle: () => (
              <HeaderTitle
                title="Створити публікацію"
                margin={{ left: 0, right: 0 }}
              />
            ),
            headerStyle: {
              borderBottomWidth: 1,
            },
            tabBarIcon: () => <SvgSprite name="new" />,
            tabBarLabel: '',
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => <SvgSprite name="user" />,
            tabBarLabel: '',
          }}
        ></Tab.Screen>
      </Tab.Navigator>
    </>
  );
};

export default TabNavigation;
