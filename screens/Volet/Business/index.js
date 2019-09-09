import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Business from "./Business";
import SellerAcc from "./AddSellerAcc";
import BusinessInfo from "./BusinessInfo";
import BillingInfo from "./BillingInfo";
import ConfirmApp from "./ConfirmApplication";
import ValidateApp from "./ValidateApplication";
import BusinessEdit from "./BusinessEdit";

const MyBusinessScreen = ({ tabBar, navigation }) => (
  console.log("Navigation", navigation),
  console.log("Tab bar", tabBar),
  <Business navigation={navigation} />
);
MyBusinessScreen.navigationOptions = {
  mode: "card",
  title: "Business",
  headerStyle: {
    backgroundColor: "white"
  }
};

const MySellerAccScreen = ({ tabBar, navigation }) => (
  console.log("Navigation", navigation),
  console.log("Tab bar", tabBar),
  <SellerAcc navigation={navigation} />
);
MySellerAccScreen.navigationOptions = {
  header: null
};

const MyBusinessInfoScreen = ({ navigation }) => (
  <BusinessInfo navigation={navigation} />
);
MyBusinessInfoScreen.navigationOptions = {
  mode: "card",
  title: "Business",
  headerStyle: {
    backgroundColor: "white"
  },
  headerRight: (
    <TouchableOpacity>
      <Text>Cancel</Text>
    </TouchableOpacity>
  )
};

const MyBillingInfoScreen = ({ navigation }) => (
  <BillingInfo navigation={navigation} />
);
MyBillingInfoScreen.navigationOptions = {
  mode: "card",
  title: "Business",
  headerStyle: {
    backgroundColor: "white"
  },
  headerRight: (
    <TouchableOpacity>
      <Text>Cancel</Text>
    </TouchableOpacity>
  )
};

const MyConfirmAppScreen = ({ navigation }) => (
  <ConfirmApp navigation={navigation} />
);
MyConfirmAppScreen.navigationOptions = {
  mode: "card",
  title: "Business",
  headerStyle: {
    backgroundColor: "white"
  },
  headerRight: (
    <TouchableOpacity>
      <Text>Cancel</Text>
    </TouchableOpacity>
  )
};

const MyValidateAppScreen = ({ navigation }) => (
  <ValidateApp navigation={navigation} />
);
MyValidateAppScreen.navigationOptions = {
  mode: "card",
  title: "Business",
  headerStyle: {
    backgroundColor: "white"
  },
  headerLeft: null
};

const MyBusinessEditScreen = ({ navigation }) => (
  <BusinessEdit navigation={navigation} />
);
MyBusinessEditScreen.navigationOptions = {
  mode: "card",
  title: "Business",
  headerStyle: {
    backgroundColor: "white"
  },
  headerLeft: null
};

const ModalStack = createStackNavigator(
  {
    Business: {
      screen: MyBusinessScreen
    },
    SellerAcc: {
      screen: MySellerAccScreen
      // navigationOptions: {
      //   gesturesEnabled: false,
      //   tabBarVisible: false
      // }
    },
    BusinessInfo: {
      screen: MyBusinessInfoScreen
    },
    BillingInfo: {
      screen: MyBillingInfoScreen
    },
    ConfirmApp: {
      screen: MyConfirmAppScreen
    },
    ValidateApp: {
      screen: MyValidateAppScreen
    },
    BusinessEdit: {
      screen: MyBusinessEditScreen
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default createAppContainer(ModalStack);
