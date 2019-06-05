import React, { Component } from 'react';
import { View, Dimensions, FlatList, TouchableOpacity, ImageBackground, StyleSheet, TextInput, ScrollView, StatusBar, Text, AsyncStorage, Image, ListItem } from 'react-native'
import { SafeAreaView, createStackNavigator, NavigationEvents } from 'react-navigation';
import Name from './component/EmployeeName'


const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

import { url } from '../../../config'

import Main from './Main'


const MyHomeScreen = ({ navigation }) => (
  <Main navigation={navigation} />
);
MyHomeScreen.navigationOptions = {
    mode: 'card',
    header: null,
};


// const MyHeaderTestScreen = ({ navigation }) => (
//   <MyNavScreen banner={`Full screen view`} navigation={navigation} />
// );
// MyHeaderTestScreen.navigationOptions = ({ navigation }) => {
//   const headerVisible =
//     navigation.state.params && navigation.state.params.headerVisible;
//   return {
//     header: headerVisible ? undefined : null,
//     title: 'Now you see me',
//   };
// };

const ModalStack = createStackNavigator(
  {
    Home: {
        screen: MyHomeScreen,
    },
    // EventInfo: {
    //     path: 'people/:name',
    //     screen: EventInfo,
    // },
    // HeaderTest: { screen: MyHeaderTestScreen },
  },
  {
    defaultNavigationOptions: {
      header: null,
      //headerLeft: null,
    }
  }
);

export default ModalStack;