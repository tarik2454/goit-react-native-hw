import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ImageBackground,
  KeyboardAvoidingView,
  Animated,
  Dimensions,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import BackgroundImage from '../images/backgroundImage.png';
import { useNavigation } from '@react-navigation/native';
import SvgComponent from '../images/SvgComponent';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectError,
  selectIsLoggedIn,
  selectUser,
  selectUserId,
  userSelector,
} from '../redux/auth/authSelectors';
import { logInThunk } from '../redux/auth/authOperations';

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [shift, setShift] = useState('');
  const [position] = useState(new Animated.Value(0));
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('Home');
    }
  }, [isLoggedIn]);

  const handleLogIn = () => {
    if (!email && !password) {
      Alert.alert('Введіть електронну пошту та пароль!');
      return;
    }

    dispatch(logInThunk({ email, password }));
    navigation.navigate('Home');
    // setEmail('');
    // setPassword('');
  };

  const handleFocus = inputName => {
    setIsFocused(prev => ({
      ...prev,
      [inputName]: true,
    }));
  };

  const handleBlur = inputName => {
    setIsFocused(prev => ({
      ...prev,
      [inputName]: false,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const listenerShow = Keyboard.addListener('keyboardDidShow', () => {
      setShift(true);
    });
    const listenerHide = Keyboard.addListener('keyboardDidHide', () => {
      setShift(false);
    });

    return () => {
      listenerShow.remove();
      listenerHide.remove();
    };
  }, []);

  useEffect(() => {
    Animated.timing(position, {
      toValue: shift ? 90 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [shift]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.page}>
          <StatusBar style="auto" />
          <ImageBackground
            style={styles.img}
            source={BackgroundImage}
            resizeMode="cover"
          />
          <ScrollView
            contentContainerStyle={styles.scrollViewContainer}
            bounces={false}
            keyboardShouldPersistTaps="always"
          >
            <Animated.View
              style={[styles.formWrapper, { paddingBottom: position }]}
            >
              <View style={styles.inner}>
                <View style={styles.foto}>
                  <Pressable style={styles.addFoto} onPress={() => {}}>
                    <SvgComponent />
                  </Pressable>
                </View>

                <Text style={styles.p}>Увійти</Text>

                <View style={styles.inputWrapper}>
                  <TextInput
                    inputMode="email"
                    keyboardType="email-address"
                    style={[
                      styles.input,
                      isFocused.email ? styles.inputFocused : null,
                    ]}
                    placeholder="Адреса електронної пошти"
                    placeholderStyle={styles.placeholder}
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                  />
                  <View style={styles.passwordInput}>
                    <TextInput
                      inputMode="text"
                      style={[
                        styles.inputRelative,
                        isFocused.password ? styles.inputFocused : null,
                      ]}
                      placeholder="Пароль"
                      placeholderStyle={styles.placeholder}
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={setPassword}
                      onFocus={() => handleFocus('password')}
                      onBlur={() => handleBlur('password')}
                    />
                    <Pressable
                      style={styles.textAbsolute}
                      onPress={togglePasswordVisibility}
                    >
                      <Text style={styles.textToggle}>
                        {showPassword ? 'Приховати' : 'Показати'}
                      </Text>
                    </Pressable>
                  </View>
                </View>

                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? '#f36601' : '#FF6C00',
                    },
                    styles.button,
                  ]}
                  onPress={handleLogIn}
                >
                  <Text style={styles.buttonText}>Увійти</Text>
                </Pressable>

                <View style={styles.linkWrapper}>
                  <Text style={{ color: '#1B4371' }}>Немає акаунту?</Text>
                  <Pressable
                    onPress={() => navigation.navigate('Registration')}
                  >
                    <Text
                      style={{
                        color: '#1B4371',
                        borderBottomWidth: 1,
                        borderBottomColor: '#1B4371',
                      }}
                    >
                      Зареєструватися
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Animated.View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const screenSize = Dimensions.get('screen');

export const styles = StyleSheet.create({
  page: {
    flex: 1,
  },

  img: {
    top: 0,
    position: 'absolute',
    height: screenSize.height,
    width: screenSize.width,
  },

  scrollViewContainer: {
    minHeight: screenSize.height,
    justifyContent: 'flex-end',
  },

  foto: {
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    position: 'absolute',
    top: -60,
    zIndex: 2,
  },

  addFoto: {
    borderRadius: 12.5,
    transform: 'rotate(45deg)',
    position: 'absolute',
    right: -12.5,
    bottom: 14,
  },

  inner: {
    display: 'flex',
    alignItems: 'center',
    height: 'fit-content',
    paddingTop: 92,
    paddingRight: 16,
    paddingBottom: 66,
    paddingLeft: 16,
    letterSpacing: 0.3,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: 'relative',
  },

  p: {
    marginBottom: 33,
    fontFamily: 'Roboto-500',
    fontSize: 30,
  },

  inputWrapper: {
    display: 'flex',
    gap: 16,
    width: '100%',
    marginBottom: 43,
  },

  input: {
    padding: 16,
    fontFamily: 'Roboto-400',
    fontSize: 16,
    color: '#212121',
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 16,
  },

  inputFocused: {
    borderColor: '#FF6C00',
  },

  placeholder: {
    color: '#BDBDBD',
  },

  inputRelative: {
    padding: 16,
    fontFamily: 'Roboto-400',
    fontSize: 16,
    color: '#212121',
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 16,
    position: 'relative',
  },

  textAbsolute: {
    position: 'absolute',
    top: 19,
    right: 16,
  },

  textToggle: {
    color: '#1B4371',
    fontFamily: 'Roboto-400',
    fontSize: 16,
  },

  button: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 100,
  },

  buttonText: {
    fontFamily: 'Roboto-400',
    fontSize: 16,
    color: '#FFFFFF',
  },

  linkWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
});

export default LoginScreen;
