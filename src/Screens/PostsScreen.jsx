import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import { View } from 'react-native';
import User from '../componets/User';
import { ScrollView } from 'react-native';
import SvgSprite from '../images/SvgSprite';
import { useNavigation, useRoute } from '@react-navigation/native';
import { selectIsLoggedIn, selectUser } from '../redux/auth/authSelectors';
import { useDispatch, useSelector } from 'react-redux';
import defaultAvatar from '../images/user-foto-big.png';
import { selectPosts } from '../redux/posts/postsSelectors';
import { getAllPosts } from '../redux/posts/postsOperation';

const defaultPosts = [
  {
    id: 1,
    image: require('../images/post-image-1.png'),
    title: 'Ліс',
    comentsCount: 0,
    locationName: `Ivano-Frankivs'k Region, Ukraine`,
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  },
  {
    id: 2,
    image: require('../images/post-image-2.png'),
    title: 'Захід на Чорному морі',
    comentsCount: 0,
    locationName: `Ivano-Frankivs'k Region, Ukraine`,
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  },
  {
    id: 3,
    image: require('../images/post-image-3.png'),
    title: 'Старий будиночок y Венеції',
    comentsCount: 0,
    locationName: `Ivano-Frankivs'k Region, Ukraine`,
    location: {
      latitude: 48.9226,
      longitude: 24.7111,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  },
];

const PostsScreen = () => {
  const navigation = useNavigation();
  const { name, email, avatarURL } = useSelector(selectUser);
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();
  const allPosts = defaultPosts.concat(posts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  const showMap = item => {
    navigation.navigate('Map', {
      location: item.location,
      title: item.title,
    });
  };

  const showComents = item => {
    navigation.navigate('Comments', item);
  };

  return (
    <ScrollView>
      <View style={GlobalStyles.container}>
        <View style={styles.wrapperImage}>
          <Image
            source={avatarURL ? { uri: avatarURL } : defaultAvatar}
            style={{ width: 60, height: 60, borderRadius: 16 }}
          />

          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>
          </View>
        </View>

        <View style={styles.wrapper}>
          {allPosts.map((item, index) => (
            <View key={index}>
              <Image
                style={styles.image}
                source={
                  typeof item.image === 'string'
                    ? { uri: item.image }
                    : item.image || defaultAvatar
                }
              />
              <Text style={styles.title}>{item.title}</Text>

              <View style={styles.footer}>
                <View style={styles.info}>
                  <TouchableOpacity
                    style={styles.coments}
                    onPress={() => showComents(item)}
                  >
                    <SvgSprite name="reviews" />
                    <Text>{item.comentsCount}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.info}>
                  <TouchableOpacity
                    style={styles.location}
                    onPress={() => showMap(item)}
                  >
                    <SvgSprite name="location" />
                    <Text>{item.locationName}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 32,
  },

  wrapperImage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 32,
  },

  name: {
    color: '#212121',
    fontFamily: 'Roboto-700',
    fontSize: 13,
  },

  email: {
    color: 'rgba(33, 33, 33, 0.80)',
    fontFamily: 'Roboto-400',
    fontSize: 11,
  },

  image: {
    width: '100%',
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },

  title: {
    marginBottom: 8,
    color: '#212121',
    fontFamily: 'Roboto-500',
    fontSize: 16,
  },

  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  info: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
  },

  coments: {
    flexDirection: 'row',
    gap: 6,
  },

  location: {
    flexDirection: 'row',
    gap: 4,
  },
});

export default PostsScreen;
