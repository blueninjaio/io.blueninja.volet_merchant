import React from 'react';

import { createBottomTabNavigator } from 'react-navigation'
import { Image, Dimensions } from 'react-native'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

import Icon from 'react-native-vector-icons/Ionicons'

import Main from '../screens/goSquid/Main'

export default createBottomTabNavigator({
    Home: {
        screen: Main,
        navigationOptions: {
            //tabBarLabel: 'Home',
            tabBarIcon: ({tintColor}) => (
                <Icon name='md-home' color={tintColor} size={30} />
                // <Image source={require('../assets/images/image.png')} resizeMode="contain" style={{width: 30, height: 30}} />
            )
        }
    }
},{
    tabBarOptions:{
        activeTintColor: 'white',
        inactiveTintColor: 'white',
        style: {
            backgroundColor: 'rgb(0,170,211)',
            borderTopWidth: 0,
            shadowOffset: { width: 5, height: 3},
            shadowColor: 'black',
            shadowOpacity: 0.5,
            elevation: 5,
            height: height/10
        }
    }
})