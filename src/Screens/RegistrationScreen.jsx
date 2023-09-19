import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export const RegistrationScreen = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>Реєстрація</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          type="text"
          style={styles.input}
          placeholder="Логін"
          placeholderStyle={styles.placeholder}
        />
        <TextInput
          type="email"
          style={styles.input}
          placeholder="Адреса електронної пошти"
          placeholderStyle={styles.placeholder}
        />
        <TextInput
          style={styles.input}
          placeholder="Пароль"
          placeholderStyle={styles.placeholder}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.toggleButton}
        >
          {showPassword ? (
            <Text style={styles.toggleButtonText}>Приховати</Text>
          ) : (
            <Text style={styles.toggleButtonText}>Показати</Text>
          )}
        </TouchableOpacity>
        <Button
          title="Register"
          onPress={() => {
            /* Обробка події натискання кнопки */
          }}
        />
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    height: 'fit-content',
    paddingTop: 92,
    paddingRight: 16,
    paddingBottom: 78,
    paddingLeft: 16,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  header: {
    marginBottom: 33,
    fontSize: 24,
  },
  inputWrapper: {
    display: 'flex',
    gap: 16,
    width: '100%',
  },
  input: {
    padding: 16,

    // fontFamily: 'Roboto',
    // fontSize: 16,
    // fontStyle: 'normal',
    // fontWeight: 400,
    // lineHeight: normal,
    color: '#BDBDBD',
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 16,
  },
  placeholder: {
    color: '#BDBDBD',
  },
});
