import React from "react";

import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import { View, Image, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

import Icon from "react-native-vector-icons/Ionicons";

import Home from "../screens/Volet/Home";
import Statistic from "../screens/Volet/Statistic";
import Business from "../screens/Volet/Business";
import Profile from "../screens/Volet/Profile";

const UserTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>
          tintColor === "black" ? (
            <Image
              source={require("../assets/homeInactive.png")}
              resizeMode="contain"
              style={{ width: 30, height: 30 }}
            />
          ) : (
            <Image
              source={require("../assets/home.png")}
              resizeMode="contain"
              style={{ width: 30, height: 30 }}
            />
          )
      }
    },
    Statistic: {
      screen: Statistic,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>
          tintColor === "black" ? (
            <Image
              source={require("../assets/statistic.png")}
              resizeMode="contain"
              style={{ width: 55, height: 90 }}
            />
          ) : (
            <Image
              source={require("../assets/statisticActive.png")}
              resizeMode="contain"
              style={{ width: 103, height: 90, marginTop: -10 }}
            />
          )
      }
    },
    Business: {
      screen: Business,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>
          tintColor === "black" ? (
            <Image
              source={require("../assets/business.png")}
              resizeMode="contain"
              style={{ width: 60, height: 70 }}
            />
          ) : (
            <Image
              source={require("../assets/businessActive.png")}
              resizeMode="contain"
              style={{ width: 60, height: 70 }}
            />
          )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>
          tintColor === "black" ? (
            <Image
              source={require("../assets/profileInactive.png")}
              resizeMode="contain"
              style={{ width: 30, height: 30 }}
            />
          ) : (
            <Image
              source={require("../assets/profile.png")}
              resizeMode="contain"
              style={{ width: 40, height: 40 }}
            />
          )
      }
    }
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: "blue",
      inactiveTintColor: "black",
      showLabel: false,
      indicatorStyle: { backgroundColor: "transparent" },
      style: {
        backgroundColor: "white",
        shadowOffset: { width: 5, height: 3 },
        shadowColor: "black",
        shadowOpacity: 0.5,
        elevation: 5,
        height: height / 12
      }
    }
  }
);

const StackNavigator = createStackNavigator({
  Home: {
    screen: UserTabNavigator,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
});

export default createAppContainer(StackNavigator);
