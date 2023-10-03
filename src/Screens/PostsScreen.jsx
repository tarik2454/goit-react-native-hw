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

const defaultPosts = [
  {
    id: 1,
    img: require('../images/post-image-1.png'),
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
    img: require('../images/post-image-2.png'),
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
    img: require('../images/post-image-3.png'),
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
  const [userName, setUserName] = useState('Anonimus');
  const [userEmail, setUserEmail] = useState('anonimus@mail.com');
  const [posts, setPosts] = useState(defaultPosts);
  const navigation = useNavigation();
  const { params } = useRoute();
  const { name, email, avatarURL } = useSelector(selectUser);
  console.log(avatarURL);

  if (params && !posts.some(el => params.id === el.id)) {
    setPosts(prev => [...prev, params]);
  }

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
        <Image
          style={{ width: 100, height: 100 }}
          source={avatarURL ? { uri: avatarURL } : defaultAvatar}
        />
        <View style={styles.wrapper}>
          {posts.map((item, index) => (
            <View key={index}>
              <Image style={styles.image} source={item.img} />
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
    gap: 34,
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
