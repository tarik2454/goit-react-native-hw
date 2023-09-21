import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation(); // Инициализируем навигацию

  const goToRegistrationScreen = () => {
    navigation.navigate('Registration'); // Переход на экран Registration
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registration Form</Text>
      <TextInput style={styles.input} placeholder="Username" />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Button
        title="Register"
        // onPress={() => {
        //   /* Обробка події натискання кнопки */
        // }}
        onPress={goToRegistrationScreen}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    fontSize: 24,
    marginBottom: 20,
  },

  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 10,
  },
});

export default LoginScreen;
