import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Statistic from "./Statistic";

const MyStatisticScreen = ({ navigation }) => (
  <Statistic navigation={navigation} />
);
MyStatisticScreen.navigationOptions = {
  mode: "card",
  header: null
};

const ModalStack = createStackNavigator(
  {
    Statistic: {
      screen: MyStatisticScreen
    }
  },
  {
    defaultNavigationOptions: {}
  }
);

export default createAppContainer(ModalStack);
