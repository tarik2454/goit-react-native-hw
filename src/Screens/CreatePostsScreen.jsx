import React, { useState } from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import SvgSprite from '../images/SvgSprite';

const CreatePostsScreen = () => {
  const [isPressed, setIsPressed] = useState(false);

  const selectImage = () => {
    const options = {
      title: 'Виберіть фото',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('Отменено');
      } else if (response.error) {
        console.log('Ошибка: ', response.error);
      } else {
        // Здесь вы можете обработать выбранное изображение, например, сохранить его в состояние компонента или передать на сервер
        console.log('Выбранное изображение: ', response.uri);
      }
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
        <TouchableWithoutFeedback onPress={selectImage}>
          <View style={styles.foto}>
            <View style={styles.circle}></View>
            <SvgSprite style={styles.svgIcon} name="camera" />
          </View>
        </TouchableWithoutFeedback>
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
          onPress={handlePress}
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
});

export default CreatePostsScreen;
