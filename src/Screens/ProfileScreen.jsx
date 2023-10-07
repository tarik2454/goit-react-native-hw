import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import backgroundImage from '../images/backgroundImage.png';
import PostList from '../componets/PostList';
import GlobalStyles from '../styles/GlobalStyles';
import SvgSprite from '../images/SvgSprite';
import LogOutBtn from '../componets/LogOutBtn';
import {
  changeAvatar,
  deleteAvatar,
  logOutThunk,
} from '../redux/auth/authOperations';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../redux/auth/authSelectors';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import defaultAvatar from '../images/user-foto-big.png';
import { selectPostsByOwner } from '../redux/posts/postsSelectors';
import PostItem from '../componets/PostItem';

const ProfileScreen = () => {
  const defaultPosts = [
    {
      img: require('../images/post-image-1.png'),
      title: 'Ліс',
      comentsCount: 0,
      likeCount: 0,
      location: `Ukraine`,
    },
    {
      img: require('../images/post-image-2.png'),
      title: 'Захід на Чорному морі',
      comentsCount: 0,
      likeCount: 0,
      location: `Ukraine`,
    },
    {
      img: require('../images/post-image-3.png'),
      title: 'Старий будиночок y Венеції',
      comentsCount: 0,
      likeCount: 0,
      location: `Italy`,
    },
  ];

  const { name, avatarURL } = useSelector(selectUser);
  const posts = useSelector(selectPostsByOwner);
  const dispatch = useDispatch();
  // const allPosts = defaultPosts.concat(posts);

  useEffect(() => {
    console.log(posts);
  });

  async function selectAvatar() {
    const { granted } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert('Permission to access of the image library is required!');
      return;
    }

    const { canceled, assets } = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      allowsEditing: true,
      allowsMultipleSelection: false,
    });
    if (!canceled) {
      dispatch(changeAvatar(assets[0].uri));
    }
  }

  function removeAvatar() {
    dispatch(deleteAvatar());
  }

  return (
    <View style={styles.page}>
      <ImageBackground
        style={styles.img}
        source={backgroundImage}
        resizeMode="cover"
      />

      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        bounces={false}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.inner}>
          <View style={styles.foto}>
            {avatarURL ? (
              <>
                <Image
                  source={{ uri: avatarURL }}
                  style={{ width: 120, height: 120, borderRadius: 16 }}
                />
                <Pressable style={styles.addFotoGray} onPress={removeAvatar}>
                  <SvgSprite name="add-grey" />
                </Pressable>
              </>
            ) : (
              <>
                <Image
                  source={defaultAvatar}
                  style={{ width: 120, height: 120, borderRadius: 16 }}
                />
                <Pressable style={styles.addFotoOrange} onPress={selectAvatar}>
                  <SvgSprite name="add-orange" />
                </Pressable>
              </>
            )}
          </View>

          <TouchableOpacity
            style={styles.logOutBtn}
            onPress={() => dispatch(logOutThunk())}
          >
            <LogOutBtn />
          </TouchableOpacity>

          <Text style={styles.authorName}>{name}</Text>

          <View style={GlobalStyles.container}>
            <View style={styles.wrapper}>
              {posts.map(post => {
                return <PostItem key={post.id} post={post} />;
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const screenSize = Dimensions.get('screen');

export const styles = StyleSheet.create({
  page: {
    flex: 1,
  },

  img: {
    top: 0,
    position: 'absolute',
    height: screenSize.height,
    width: screenSize.width,
  },

  inner: {
    display: 'flex',
    minHeight: 0,
    marginTop: 142,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: 'relative',
  },

  foto: {
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    position: 'absolute',
    top: -60,
    left: '50%',
    marginLeft: -60,
    zIndex: 2,
  },

  addFotoOrange: {
    borderRadius: 12.5,
    transform: 'rotate(45deg)',
    position: 'absolute',
    right: -12.5,
    bottom: 14,
  },

  addFotoGray: {
    borderRadius: 12.5,
    position: 'absolute',
    right: -18,
    bottom: 7.5,
  },

  logOutBtn: {
    position: 'absolute',
    top: 22,
    right: 16,
    zIndex: 1,
  },

  authorName: {
    marginTop: 92,
    color: '#212121',
    textAlign: 'center',
    fontFamily: 'Roboto-500',
    fontSize: 30,
    letterSpacing: 0.3,
  },

  scrollViewContainer: {
    minHeight: screenSize.height,
  },

  wrapper: {
    gap: 34,
  },

  image: {
    width: '100%',
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

  infoWrapper: {
    flexDirection: 'row',
    gap: 24,
  },

  info: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
  },
});

export default ProfileScreen;
