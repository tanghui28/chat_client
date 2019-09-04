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

global.Net = Net;

import Login from './src/pages/login'
import Register from './src/pages/register'
import Choose from './src/pages/choose'

import {
  createAppContainer
} from 'react-navigation'
import {
  createStackNavigator
} from 'react-navigation-stack';

const RootNavigator = createStackNavigator(
  {
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
