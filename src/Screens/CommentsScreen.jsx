import React, { useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import GlobalStyles from '../styles/GlobalStyles';
import SvgSprite from '../images/SvgSprite';

const defaultComents = [
  {
    useId: 123,
    body: 'Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!',
    useAvatar: require('../images/avatar-comment-1.png'),
    dataTime: '09 червня, 2020 | 08:40',
  },
  {
    useId: 111,
    body: 'A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.',
    useAvatar: require('../images/avatar-comment-2.png'),
    dataTime: '09 червня, 2020 | 09:14',
  },
  {
    useId: 123,
    body: 'Thank you! That was very helpful!',
    useAvatar: require('../images/avatar-comment-1.png'),
    dataTime: '09 червня, 2020 | 09:20',
  },
];

const CommentsScreen = () => {
  const [comments, setComments] = useState(defaultComents);
  const [message, setMessage] = useState('');
  const [iconColor, setIconColor] = useState('#FF6C00');
  const navigation = useNavigation();

  const { params } = useRoute();

  useEffect(() => {
    navigation.setOptions({
      title: 'Коментарі',
      headerStyle: { borderBottomWidth: 1 },
      headerTitleStyle: {
        marginLeft: 90,
        fontFamily: 'Roboto-500',
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: -0.408,

        color: '#212121',
      },
    });
  }, []);

  const handleSendPress = () => {
    // Обработка нажатия кнопки отправки здесь
    // Вы можете добавить свою логику для отправки комментария
    // Сбросьте ввод и обновите состояние комментариев, если это необходимо
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -200}
      >
        <ScrollView bounces={false} keyboardShouldPersistTaps="always">
          <View style={GlobalStyles.container}>
            <Image
              style={styles.postPhoto}
              source={
                params.img ? params.img : require('../images/user-foto.png')
              }
            />
            <View style={styles.commentsWrapper}>
              {comments.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.comentInfo,
                    item.useId === 111
                      ? { flexDirection: 'row-reverse' }
                      : { flexDirection: 'row' },
                  ]}
                >
                  <Image
                    style={styles.avatarPhoto}
                    source={
                      item.useAvatar
                        ? item.useAvatar
                        : require('../images/user-foto.png')
                    }
                  />
                  <View
                    style={{
                      maxWidth: '75%',
                      backgroundColor: 'rgba(0, 0, 0, 0.03)',
                      borderRadius: 6,
                      padding: 16,
                    }}
                  >
                    <Text style={styles.title}>{item.body}</Text>
                    <Text style={styles.time}>{item.dataTime}</Text>
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                multiline={true}
                inputMode="text"
                value={message}
                onChangeText={setMessage}
                placeholder="Коментувати..."
                placeholderStyle={styles.placeholder}
              />
              <TouchableOpacity
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? '#f36601' : '#FF6C00',
                  },
                  styles.buttonSend,
                ]}
                onPress={handleSendPress}
              >
                <Text style={styles.buttonIcon}>
                  <SvgSprite name="send" fill={iconColor} />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
    fontFamily: 'Roboto-400',
    fontSize: 13,
    lineHeight: 18,
    color: '#212121',
  },

  postPhoto: {
    height: 240,
    width: '100%',
    marginBottom: 32,
    borderRadius: 8,
  },

  commentsWrapper: {
    display: 'flex',
    gap: 24,
    marginBottom: 32,
  },

  avatarPhoto: {
    borderRadius: 14,
    width: 28,
    height: 28,
  },

  comentInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    maxWidth: '100%',
  },

  time: {
    color: '#BDBDBD',
    textAlign: 'right',
    fontFamily: 'Roboto-400',
    fontSize: 10,
  },

  input: {
    width: '100%',
    height: 50,
    paddingTop: 17,
    paddingLeft: 16,
    paddingBottom: 15,
    fontFamily: 'Inter-500',
    fontSize: 16,
    backgroundColor: '#F6F6F6',
    borderRadius: 100,
    position: 'fixed',
  },

  placeholder: {
    fontFamily: 'Inter-500',
    fontSize: 16,
  },

  buttonSend: {
    width: 34,
    borderRadius: 17,
  },

  buttonIcon: {
    position: 'absolute',
    right: 8,
    bottom: 8,
  },
});

export default CommentsScreen;
