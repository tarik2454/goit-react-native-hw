import 'react-native-gesture-handler';
import React from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/Screens/LoginScreen';
import RegistrationScreen from './src/Screens/RegistrationScreen';
import Home from './src/Screens/Home';
import MapScreen from './src/Screens/MapScreen';
import CommentsScreen from './src/Screens/CommentsScreen';

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    'Roboto-400': require('./src/assets/fonts/Roboto-400.ttf'),
    'Roboto-500': require('./src/assets/fonts/Roboto-500.ttf'),
    'Roboto-700': require('./src/assets/fonts/Roboto-700.ttf'),
    'Inter-500': require('./src/assets/fonts/Inter-500.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Comments" component={CommentsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
