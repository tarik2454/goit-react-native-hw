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
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../redux/auth/authSelectors';
import { selectPostByID } from '../redux/posts/postsSelectors';
import defaultAvatar from '../images/avatar-comment-1.png';
import { addComment } from '../redux/posts/postsOperation';
import CommentItem from '../componets/CommentItem';

const defaultComents = [
  {
    id: 123,
    body: 'Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!',
    useAvatar: require('../images/avatar-comment-1.png'),
    dataTime: '09 червня, 2020 | 08:40',
  },
  {
    id: 111,
    body: 'A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.',
    useAvatar: require('../images/avatar-comment-2.png'),
    dataTime: '09 червня, 2020 | 09:14',
  },
  {
    id: 123,
    body: 'Thank you! That was very helpful!',
    useAvatar: require('../images/avatar-comment-1.png'),
    dataTime: '09 червня, 2020 | 09:20',
  },
];

const CommentsScreen = () => {
  const [message, setMessage] = useState('');
  const { params } = useRoute();
  const { uid } = useSelector(selectUser);
  const { id, image, comments } = useSelector(selectPostByID(params.id));
  const isAnyComment = comments?.length > 0;
  const [iconColor, setIconColor] = useState('#FF6C00');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onMessageSubmit = () => {
    const createdAt = Date.now();
    const newComment = {
      id: uid + createdAt,
      authorID: uid,
      createdAt,
      message,
    };

    Keyboard.dismiss();
    dispatch(addComment({ id, comment: newComment }));
    setMessage('');
  };

  useEffect(() => {
    console.log(image);
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
  }, [navigation]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView bounces={false} keyboardShouldPersistTaps="always">
        <View style={GlobalStyles.container}>
          <Image
            style={styles.postPhoto}
            source={image ? { uri: image } : defaultAvatar}
          />
          {isAnyComment ? (
            <View style={styles.commentsWrapper}>
              {comments.map(comment => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </View>
          ) : (
            <Text>Відгуки даного допису відсутні.</Text>
          )}

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
              onPress={() => message && onMessageSubmit()}
            >
              <Text style={styles.buttonIcon}>
                <SvgSprite name="send" fill={iconColor} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
