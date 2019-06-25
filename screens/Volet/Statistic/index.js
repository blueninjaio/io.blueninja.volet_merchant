import React, { Component } from 'react';
import { View, Dimensions, FlatList, TouchableOpacity, ImageBackground, StyleSheet, TextInput, ScrollView, StatusBar, Text, AsyncStorage, Image, ListItem } from 'react-native'
import { SafeAreaView, createStackNavigator, NavigationEvents } from 'react-navigation';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height


import Statistic from './Statistic'


const MyStatisticScreen = ({ navigation }) => (
  <Statistic navigation={navigation} />
);
MyStatisticScreen.navigationOptions = {
    mode: 'card',
    title: 'Statistic',
    headerStyle: {
        backgroundColor: "white",
    },
};

const ModalStack = createStackNavigator(
  {
    Statistic: {
        screen: MyStatisticScreen,
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
      //headerLeft: null,
    }
  }
);

export default ModalStack;