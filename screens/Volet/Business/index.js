import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { createStackNavigator } from "react-navigation";

import Business from "./Business";
import SellerAcc from "./AddSellerAcc";
import BusinessInfo from "./BusinessInfo";
import BillingInfo from "./BillingInfo";
import ConfirmApp from "./ConfirmApplication";
import ValidateApp from "./ValidateApplication";

const MyBusinessScreen = ({ navigation }) => (
  <Business navigation={navigation} />
);
MyBusinessScreen.navigationOptions = {
  mode: "card",
  title: "Business",
  headerStyle: {
    backgroundColor: "white"
  }
};

const MySellerAccScreen = ({ navigation }) => (
  <SellerAcc navigation={navigation} />
);
MySellerAccScreen.navigationOptions = {
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

const ModalStack = createStackNavigator(
  {
    Business: {
      screen: MyBusinessScreen
    },
    SellerAcc: {
      screen: MySellerAccScreen
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
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default ModalStack;
