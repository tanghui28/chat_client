/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {
  Net
} from './src/config/request'

// 引入iconfont
// import { Iconfont } from './font/index'

global.Net = Net;

import Login from './src/pages/login'
import Register from './src/pages/register'
import Choose from './src/pages/choose'
import ChatList from './src/pages/chatList'
import FriendsList from './src/pages/friendsList'

import {  createAppContainer} from 'react-navigation'
import {  createStackNavigator} from 'react-navigation-stack';
import {  createBottomTabNavigator} from 'react-navigation-tabs'


const bottomTabNavigator = createBottomTabNavigator({
  chat: {
    screen: ChatList,
    navigationOptions: {
      tabBarLabel: '消息'
    }
  },
  friends: {
    screen: FriendsList,
    navigationOptions: {
      tabBarLabel:'通讯录'
    }
  }
})


const RootNavigator = createStackNavigator(
  {
    bottomTabNavigator: {
      screen: bottomTabNavigator,
      navigationOptions: {
        gesturesEnabled: true,
        header: null
      }
    },
    Choose: {
      screen: Choose,
      navigationOptions: {
        gesturesEnabled: true,
        header: null
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        gesturesEnabled: true,
        header:null
      }
    },
    Register: {
      screen: Register,
      navigationOptions: {
        gesturesEnabled: true,
        header: null
      }
    }
  
  }
)

const AppContainer = createAppContainer(RootNavigator);




const App = () => {
  return (
    < AppContainer />
  );
};

const styles = StyleSheet.create({

});

export default App;
