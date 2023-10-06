import React, { useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
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
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../redux/auth/authSelectors';
import { addPost } from '../redux/posts/postsOperation';

const CreatePostsScreen = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [photoName, setPhotoName] = useState('');
  const [photoLocation, setPhotoLocation] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [location, setLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState('');
  const navigation = useNavigation();
  const { uid } = useSelector(selectUser);
  const dispatch = useDispatch();

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
    // const pic = await cameraRef.takePictureAsync();
    const { uri } = await cameraRef.takePictureAsync();
    await MediaLibrary.createAssetAsync(uri);
    setPhoto(uri);
    console.log('====================================');
    console.log(uri); // Используйте uri вместо pic.uri
    console.log('====================================');
  };

  const handleSubmit = () => {
    dispatch(
      addPost({
        id: uid,
        image: photo,
        location: location,
        title: photoName,
        comentsCount: [],
        locationName: photoLocation,
      })
    );
    resetData();
    navigation.navigate('Posts');
  };

  function resetData() {
    setPhotoName(null);
    setPhotoLocation(null);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView bounces={false} keyboardShouldPersistTaps="always">
          <View style={GlobalStyles.container}>
            <Camera style={styles.camera} ref={setCameraRef}>
              {photo ? (
                <View style={styles.cameraIMG}>
                  <Image
                    source={{ uri: photo }}
                    style={{ width: '100%', height: 240 }}
                    resizeMode="cover"
                  />
                </View>
              ) : (
                <TouchableOpacity style={styles.buttonFoto} onPress={takePhoto}>
                  <View style={styles.foto}>
                    <View style={styles.circle}></View>
                    <View style={styles.buttonIcon}>
                      <SvgSprite name="camera" />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </Camera>
            {photo ? (
              <Text style={styles.textFoto}>Редагувати фото</Text>
            ) : (
              <Text style={styles.textFoto}>Завантажте фото</Text>
            )}

            <View style={styles.form}>
              <TextInput
                style={styles.textInput}
                inputMode="text"
                value={photoName}
                onChangeText={setPhotoName}
                placeholder="Назва..."
              />
              <View style={styles.inputWrapper}>
                <View style={styles.inputIcon}>
                  <SvgSprite name="location" />
                </View>
                <TextInput
                  style={styles.textInputLocation}
                  inputMode="text"
                  placeholder="Місцевість..."
                  value={photoLocation}
                  onChangeText={setPhotoLocation}
                />
              </View>
            </View>
            <Pressable
              style={() => [
                {
                  backgroundColor: isFormValid ? '#f36601' : '#F6F6F6',
                },
                styles.button,
              ]}
              onPress={handleSubmit}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
            >
              <Text style={styles.buttonText}>
                <Text style={{ color: isFormValid ? '#FFFFFF' : '#BDBDBD' }}>
                  Опубліковати
                </Text>
              </Text>
            </Pressable>

            <View style={styles.center}>
              <TouchableOpacity style={styles.buttonTrash}>
                <SvgSprite name="trash" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
    // borderRadius: 8,
    borderWidth: 1,
    // overflow: 'hidden',
  },

  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF', // Заливка круга
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 11,

    transform: [{ translateX: -30 }, { translateY: -30 }],
  },

  buttonIcon: {
    position: 'absolute',
    zIndex: 100,
  },

  camera: {
    // position: 'relative',
    width: '100%',
    height: 240,
    marginBottom: 8,
    // backgroundColor: '#F6F6F6',
  },

  cameraIMG: {
    width: '100%',
    height: 240,
    backgroundColor: '#F6F6F6',
    // position: 'absolute',
    // zIndex: 10,
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
    width: '100%',
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
  },

  textInputLocation: {
    width: '100%',
    paddingTop: 16,
    paddingLeft: 28,
    paddingBottom: 16,
    color: '#212121',
    fontFamily: 'Roboto-400',
    fontSize: 16,
    borderColor: '#E8E8E8',
    borderBottomWidth: 1,
  },

  inputIcon: {
    position: 'absolute',
  },

  button: {
    marginBottom: 120,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 100,
  },

  buttonText: {
    textAlign: 'center',
    fontFamily: 'Roboto-400',
    fontSize: 16,
    color: '#BDBDBD',
  },

  center: {
    display: 'flex',
    alignItems: 'center',
  },

  buttonTrash: {
    width: 70,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 23,
    paddingRight: 23,
    backgroundColor: '#F6F6F6',
    borderRadius: 100,
  },
});

export default CreatePostsScreen;
