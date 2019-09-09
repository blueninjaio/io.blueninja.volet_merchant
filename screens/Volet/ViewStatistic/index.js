import React from "react";
import { createStackNavigator } from "react-navigation";

import ViewStatistic from "./ViewStatistic";

const MyViewStatisticScreen = ({ navigation }) => (
  <ViewStatistic navigation={navigation} />
);
MyViewStatisticScreen.navigationOptions = {
  mode: "card",
  title: "ViewStatistic",
  headerStyle: {
    backgroundColor: "white"
  }
};

const ModalStack = createStackNavigator(
  {
    ViewStatistic: {
      screen: MyViewStatisticScreen
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default ModalStack;
