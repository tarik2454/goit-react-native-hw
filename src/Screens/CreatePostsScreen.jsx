import React, { useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StyleSheet } from 'react-native';
import SvgSprite from '../images/SvgSprite';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import { TouchableOpacity } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';

const CreatePostsScreen = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [photoName, setPhotoName] = useState('');
  const [photoLocation, setPhotoLocation] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [location, setLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === 'granted');
    })();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setLocation(coords);
    })();
  }, []);

  useEffect(() => {
    if (photo && photoName && photoLocation) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [photo, photoName, photoLocation]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    const pic = await cameraRef.takePictureAsync();
    setPhoto(pic.uri);
    console.log('====================================');
    console.log(pic.uri);
    console.log('====================================');
  };

  const publicPost = () => {
    console.log(location);
    navigation.navigate('Posts', {
      id: 4,
      img: photo,
      location: location,
      title: photoName,
      comentsCount: 0,
      locationName: photoLocation,
    });
  };

  const handlePress = () => {
    // Действия, которые должны выполняться при нажатии
  };

  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={GlobalStyles.container}>
        <Camera style={styles.camera} ref={setCameraRef}>
          {photo ? (
            <View style={styles.cameraIMG}>
              <Image
                source={{ uri: photo }}
                style={{ width: '100%', height: 240 }}
              />
            </View>
          ) : (
            <TouchableOpacity onPress={takePhoto}>
              <View style={styles.foto}>
                <View style={styles.circle}></View>
                <SvgSprite style={styles.svgIcon} name="camera" />
              </View>
            </TouchableOpacity>
          )}
        </Camera>
        <Text style={styles.textFoto}>Завантажте фото</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.textInput}
            inputMode="text"
            placeholder="Назва..."
          />
          <View style={styles.inputWrapper}>
            <SvgSprite name="location" />
            <TextInput
              style={styles.textInput}
              inputMode="text"
              placeholder="Місцевість..."
              value={photoLocation}
              onChangeText={setPhotoLocation}
            />
          </View>
        </View>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? '#f36601' : '#F6F6F6',
            },
            styles.button,
          ]}
          onPress={publicPost}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
        >
          <Text
            style={[
              { color: isPressed ? '#FFFF' : '#BDBDBD' },
              styles.buttonText,
            ]}
          >
            Опубліковати
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
    // </TouchableWithoutFeedback>
  );
};

export const styles = StyleSheet.create({
  foto: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 240,
    marginBottom: 8,
    borderColor: '#E8E8E8',
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },

  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF', // Заливка круга
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
  },

  textFoto: {
    marginBottom: 32,
    color: '#BDBDBD',
    fontFamily: 'Roboto-400',
    fontSize: 16,
  },

  form: {
    gap: 16,
    marginBottom: 32,
  },

  textInput: {
    paddingTop: 16,
    paddingBottom: 16,
    color: '#212121',
    fontFamily: 'Roboto-400',
    fontSize: 16,
    borderColor: '#E8E8E8',
    borderBottomWidth: 1,
  },

  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  button: {
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 100,
  },

  buttonText: {
    textAlign: 'center',
    fontFamily: 'Roboto-400',
    fontSize: 16,
  },

  camera: {
    position: 'relative',
    width: '100%',
    height: 240,
    marginBottom: 8,
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    overflow: 'hidden',
  },

  cameraIMG: {
    width: '100%',
    height: 240,
    backgroundColor: '#F6F6F6',
    position: 'absolute',
    zIndex: 10,
  },
});

export default CreatePostsScreen;
