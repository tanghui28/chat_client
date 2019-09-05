import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

import {
  Provider,
  Toast
} from '@ant-design/react-native'

import config from '../config/config'

class FriendsList extends React.Component { 
  constructor() { 
    super();
    this.state = {};
  }

  render() { 

    return (
      < Provider >
        <View>
          <Text>friendsList</Text>
        </View>
      </ Provider>
    )

  }

}



export default FriendsList;