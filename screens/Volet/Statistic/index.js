import React from 'react';
import { createStackNavigator } from 'react-navigation';


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