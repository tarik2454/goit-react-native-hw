import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import backgroundImage from '../images/backgroundImage.png';
import PostList from '../componets/PostList';
import GlobalStyles from '../styles/GlobalStyles';
import SvgSprite from '../images/SvgSprite';
import LogOutBtn from '../componets/LogOutBtn';

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

  const [posts, setPosts] = useState(defaultPosts);

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
            <Image
              style={styles.imageUser}
              source={require('../images/user-foto-big.png')}
            />
            <Pressable style={styles.addFoto} onPress={() => {}}>
              <SvgSprite name="add-grey" />
            </Pressable>
          </View>

          <Pressable style={styles.logOutBtn} onPress={() => {}}>
            <LogOutBtn />
          </Pressable>

          <Text style={styles.authorName}>Natali Romanova</Text>

          <View style={GlobalStyles.container}>
            <View style={styles.wrapper}>
              {posts.map((item, index) => (
                <View key={index}>
                  <Image style={styles.image} source={item.img} />
                  <Text style={styles.title}>{item.title}</Text>

                  <View style={styles.footer}>
                    <View style={styles.infoWrapper}>
                      <View style={styles.info}>
                        <SvgSprite name="reviews" />
                        <Text>{item.comentsCount}</Text>
                      </View>
                      <View style={styles.info}>
                        <SvgSprite name="thumbs-up" />
                        <Text>{item.likeCount}</Text>
                      </View>
                    </View>
                    <View style={styles.info}>
                      <SvgSprite name="location" />
                      <Text>{item.location}</Text>
                    </View>
                  </View>
                </View>
              ))}
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

  imageUser: {
    width: 120,
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
  },

  addFoto: {
    borderRadius: 12.5,
    position: 'absolute',
    left: 101.82,
    top: 75.82,
    zIndex: 3,
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
