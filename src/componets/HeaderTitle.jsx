import React from 'react';
import { Text } from 'react-native';
import { StyleSheet, View } from 'react-native';

const HeaderTitle = ({ title, margin }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginLeft: margin.left,
        marginRight: margin.right,
      }}
    >
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    width: '100%',
    color: '#212121',
    textAlign: 'center',
    fontFamily: 'Roboto-400',
    fontSize: 17,
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: -0.408,
  },
});

export default HeaderTitle;
