import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import BackgroundImage from './src/images/backgroundImage.png';
import { RegistrationScreen } from './src/Screens/RegistrationScreen';

const App = () => {
  return (
    <View style={styles.page}>
      <ImageBackground source={BackgroundImage} style={styles.img}>
        <View style={styles.wrapper}>
          <RegistrationScreen />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    backgroundColor: '#eaeaea',
  },
  img: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
  },
  wrapper: {},
});

export default App;
