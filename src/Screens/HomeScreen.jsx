import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Button
        title="Перейти на другую страницу"
        onPress={() => navigation.navigate('Registration')}
      />
    </View>
  );
};

export default HomeScreen;
