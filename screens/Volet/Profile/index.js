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
import ContactSupport from "./ContactSupport";
import Feedback from "./Feedback";
import Security from "./Security";
import ResetPassword from "./ResetPassword";
import FPTac from "./FPTac";
import ConfirmPassword from "./ConfirmPassword";

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

const MyContactSupportScreen = ({ navigation }) => (
  <ContactSupport navigation={navigation} />
);
MyContactSupportScreen.navigationOptions = {
  mode: "card",
  title: "Contact Support",
  headerStyle: {
    backgroundColor: "white"
  }
};

const MyFeedbackScreen = ({ navigation }) => (
  <Feedback navigation={navigation} />
);
MyFeedbackScreen.navigationOptions = {
  mode: "card",
  title: "Feedback & Ratings",
  headerStyle: {
    backgroundColor: "white"
  }
};

const MySecurityScreen = ({ navigation }) => (
  <Security navigation={navigation} />
);
MySecurityScreen.navigationOptions = {
  mode: "card",
  title: "Security",
  headerStyle: {
    backgroundColor: "white"
  }
};

const MyResetPasswordScreen = ({ navigation }) => (
  <ResetPassword navigation={navigation} />
);
MyResetPasswordScreen.navigationOptions = {
  mode: "card",
  title: "Reset Password",
  headerStyle: {
    backgroundColor: "white"
  }
};

const MyFPTacScreen = ({ navigation }) => <FPTac navigation={navigation} />;
MyFPTacScreen.navigationOptions = {
  mode: "card",
  title: "Reset Password",
  headerStyle: {
    backgroundColor: "white"
  }
};

const MyConfirmPasswordScreen = ({ navigation }) => (
  <ConfirmPassword navigation={navigation} />
);
MyConfirmPasswordScreen.navigationOptions = {
  mode: "card",
  title: "Reset Password",
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
    },
    ContactSupport: {
      screen: MyContactSupportScreen
    },
    Feedback: {
      screen: MyFeedbackScreen
    },
    Security: {
      screen: MySecurityScreen
    },
    ResetPassword: {
      screen: MyResetPasswordScreen
    },
    FPTac: {
      screen: MyFPTacScreen
    },
    ConfirmPassword: {
      screen: MyConfirmPasswordScreen
    }
  },
  {
    defaultNavigationOptions: {
      // header: null
    }
  }
);

export default createAppContainer(ModalStack);
