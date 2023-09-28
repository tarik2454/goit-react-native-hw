import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Dimensions } from 'react-native';

const MapScreen = () => {
  const navigation = useNavigation();
  const {
    params: { location, title },
  } = useRoute();

  useEffect(() => {
    navigation.setOptions({
      title: 'Карта',
      headerStyle: { borderBottomWidth: 1 },
      headerTitleStyle: {
        marginLeft: 110,
        fontFamily: 'Roboto-500',
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: -0.408,
        color: '#212121',
      },
    });
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={location}
        mapType="standard"
        minZoomLevel={0}
      >
        <Marker title={title} coordinate={location} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen;
