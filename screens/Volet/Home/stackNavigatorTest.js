import React from 'react';
import { ScrollView, StatusBar, Text, Button } from 'react-native';
import { SafeAreaView, createStackNavigator } from 'react-navigation';

const MyNavScreen = ({ navigation, banner }) => (
  <ScrollView>
    <SafeAreaView
      forceInset={{
        top: navigation.state.routeName === 'HeaderTest' ? 'always' : 'never',
      }}
    >
      <Button
        onPress={() => navigation.navigate('Profile', { name: 'Jane' })}
        title="Go to a profile screen"
      />
      <Button
        onPress={() => navigation.navigate('HeaderTest')}
        title="Go to a header toggle screen"
      />
      {navigation.state.routeName === 'HeaderTest' && (
        <Button
          title="Toggle Header"
          onPress={() =>
            navigation.setParams({
              headerVisible:
                !navigation.state.params ||
                !navigation.state.params.headerVisible,
            })
          }
        />
      )}
      <Button onPress={() => navigation.goBack(null)} title="Go back" />
    </SafeAreaView>
    <StatusBar barStyle="default" />
  </ScrollView>
);

const MyHomeScreen = ({ navigation }) => (
  <MyNavScreen banner="Home Screen" navigation={navigation} />
);
MyHomeScreen.navigationOptions = {
  title: 'Welcome',
};

const MyProfileScreen = ({ navigation }) => (
  <MyNavScreen
    banner={`${navigation.state.params.name}'s Profile`}
    navigation={navigation}
  />
);
MyProfileScreen.navigationOptions = ({ navigation }) => ({
  title: `${navigation.state.params.name}'s Profile!`,
});

const ProfileNavigator = createStackNavigator(
  {
    Home: {
      screen: MyHomeScreen,
    },
    Profile: {
      path: 'people/:name',
      screen: MyProfileScreen,
    },
  },
  {
    defaultNavigationOptions: {
      headerLeft: null,
    },
  }
);

const MyHeaderTestScreen = ({ navigation }) => (
  <MyNavScreen banner={`Full screen view`} navigation={navigation} />
);
MyHeaderTestScreen.navigationOptions = ({ navigation }) => {
  const headerVisible =
    navigation.state.params && navigation.state.params.headerVisible;
  return {
    header: headerVisible ? undefined : null,
    title: 'Now you see me',
  };
};

const ModalStack = createStackNavigator(
  {
    ProfileNavigator: {
      screen: ProfileNavigator,
    },
    HeaderTest: { screen: MyHeaderTestScreen },
  },
  {
    defaultNavigationOptions: {
      header: null,
    }
  }
);

export default ModalStack;