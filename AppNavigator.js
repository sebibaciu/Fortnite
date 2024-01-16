// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import NewToFortniteScreen from './screens/NewToFortniteScreen';
import MainScreen from './screens/MainScreen';
import RegisterScreen from './screens/RegisterScreen'; 
import FortniteShopScreen from './screens/FortniteShopScreen'; 
import XPCalculatorScreen from './screens/XPCalculatorScreen'; 


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="NewToFortnite" component={NewToFortniteScreen} />
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} /> 
      <Stack.Screen name="FortniteShop" component={FortniteShopScreen} />
      <Stack.Screen name="XPCalculator" component={XPCalculatorScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
