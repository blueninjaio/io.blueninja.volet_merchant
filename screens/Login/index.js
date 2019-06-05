import React from 'react';
import {  createStackNavigator } from 'react-navigation';

import Login from './Login'

const LoginScreen = ({ navigation }) => (
  <Login navigation={navigation} />
)

LoginScreen.navigationOptions = {
    mode: 'card',
    header: null,
}

const ModalStack = createStackNavigator(
  {
    Login: {
        screen: LoginScreen,
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    }
  }
);

export default ModalStack