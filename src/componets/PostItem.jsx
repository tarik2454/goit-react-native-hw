import React from 'react';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { View } from 'react-native';
import SvgSprite from '../images/SvgSprite';

const PostItem = () => {
  return (
    <>
      <View>
        <Image
          style={styles.image}
          source={require('../images/post-image-1.png')}
        ></Image>
        <Text style={styles.title}>Ліс</Text>
        <View style={styles.footer}>
          <View style={styles.info}>
            <SvgSprite name="reviews" />
            <Text>0</Text>
          </View>
          <View style={styles.info}>
            <SvgSprite name="location" />
            <Text>Ivano-Frankivs'k Region, Ukraine</Text>
          </View>
        </View>
      </View>
      <View>
        <Image
          style={styles.image}
          source={require('../images/post-image-1.png')}
        ></Image>
        <Text style={styles.title}>Ліс</Text>
        <View style={styles.footer}>
          <View style={styles.info}>
            <SvgSprite name="reviews" />
            <Text>0</Text>
          </View>
          <View style={styles.info}>
            <SvgSprite name="location" />
            <Text>Ivano-Frankivs'k Region, Ukraine</Text>
          </View>
        </View>
      </View>
      <View>
        <Image
          style={styles.image}
          source={require('../images/post-image-1.png')}
        ></Image>
        <Text style={styles.title}>Ліс</Text>
        <View style={styles.footer}>
          <View style={styles.info}>
            <SvgSprite name="reviews" />
            <Text>0</Text>
          </View>
          <View style={styles.info}>
            <SvgSprite name="location" />
            <Text>Ivano-Frankivs'k Region, Ukraine</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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

export default PostItem;
