import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Profile from "./Profile";
import Setting from "./Setting";
import Logout from "./Logout";
import PersonalDetails from "./PersonalDetails";
import AboutVolet from "./AboutVolet";
import FAQ from "./FAQ";
import Policies from "./Policies";
import ReviewRatings from "./ReviewRatings";

const MyProfileScreen = ({ navigation }) => <Profile navigation={navigation} />;
MyProfileScreen.navigationOptions = {
  mode: "card",
  header: null
};

const MySettingScreen = ({ navigation }) => <Setting navigation={navigation} />;
MySettingScreen.navigationOptions = {
  mode: "card",
  title: "Settings",
  headerStyle: {
    backgroundColor: "white"
  }
};

const MyLogoutScreen = ({ navigation }) => <Logout navigation={navigation} />;
MyLogoutScreen.navigationOptions = {
  mode: "card",
  header: null
};

const MyPersonalDetailsScreen = ({ navigation }) => (
  <PersonalDetails navigation={navigation} />
);
MyPersonalDetailsScreen.navigationOptions = {
  mode: "card",
  header: null
};

const MyAboutVoletScreen = ({ navigation }) => (
  <AboutVolet navigation={navigation} />
);
MyAboutVoletScreen.navigationOptions = {
  mode: "card",
  title: "About Volet",
  headerStyle: {
    backgroundColor: "white"
  }
};

const MyFAQScreen = ({ navigation }) => <FAQ navigation={navigation} />;
MyFAQScreen.navigationOptions = {
  mode: "card",
  title: "FAQ",
  headerStyle: {
    backgroundColor: "white"
  }
};

const MyPoliciesScreen = ({ navigation }) => (
  <Policies navigation={navigation} />
);
MyPoliciesScreen.navigationOptions = {
  mode: "card",
  title: "Policies",
  headerStyle: {
    backgroundColor: "white"
  }
};

const MyReviewRatingsScreen = ({ navigation }) => (
  <ReviewRatings navigation={navigation} />
);

MyReviewRatingsScreen.navigationOptions = {
  mode: "card",
  title: "Reviews and Ratings",
  headerStyle: {
    backgroundColor: "white"
  }
};

const ModalStack = createStackNavigator(
  {
    Profile: {
      screen: MyProfileScreen
    },
    Setting: {
      screen: MySettingScreen
    },
    Logout: {
      screen: MyLogoutScreen
    },
    PersonalDetails: {
      screen: MyPersonalDetailsScreen
    },
    AboutVolet: {
      screen: MyAboutVoletScreen
    },
    FAQ: {
      screen: MyFAQScreen
    },
    Policies: {
      screen: MyPoliciesScreen
    },
    ReviewRatings: {
      screen: MyReviewRatingsScreen
    }
  },
  {
    defaultNavigationOptions: {
      // header: null
    }
  }
);

export default createAppContainer(ModalStack);
