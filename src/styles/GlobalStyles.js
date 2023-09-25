import { StyleSheet } from 'react-native';

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    // paddingBottom: 32,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: 'white',
  },

  headerStyles: {
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

export default GlobalStyles;
