import React, { useState } from 'react';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { View } from 'react-native';
import SvgSprite from '../images/SvgSprite';

const PostList = () => {
  const defaultPosts = [
    {
      img: require('../images/post-image-1.png'),
      title: 'Ліс',
      comentsCount: 0,
      location: `Ivano-Frankivs'k Region, Ukraine`,
    },
    {
      img: require('../images/post-image-2.png'),
      title: 'Захід на Чорному морі',
      comentsCount: 0,
      location: `Ivano-Frankivs'k Region, Ukraine`,
    },
    {
      img: require('../images/post-image-3.png'),
      title: 'Старий будиночок y Венеції',
      comentsCount: 0,
      location: `Ivano-Frankivs'k Region, Ukraine`,
    },
  ];

  const [posts, setPosts] = useState(defaultPosts);

  return (
    <View style={styles.wrapper}>
      {posts.map((item, index) => (
        <View key={index}>
          <Image style={styles.image} source={item.img} />
          <Text style={styles.title}>{item.title}</Text>

          <View style={styles.footer}>
            <View style={styles.info}>
              <SvgSprite name="reviews" />
              <Text>{item.comentsCount}</Text>
            </View>
            <View style={styles.info}>
              <SvgSprite name="location" />
              <Text>{item.location}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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

  info: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
  },
});

export default PostList;
