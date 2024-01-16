/**
 * @format
 */

// index.js or App.js
import React from 'react';
import { AppRegistry } from 'react-native';
import AppNavigator from './AppNavigator';  // Import your main navigator
import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => App);

