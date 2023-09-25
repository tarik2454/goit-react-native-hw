import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const User = () => {
  return (
    <View style={styles.wrapper}>
      <Image source={require('../images/user-foto.png')} />
      <View>
        <Text style={styles.name}>Natali Romanova</Text>
        <Text style={styles.email}>email@example.com</Text>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
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
});

export default User;
