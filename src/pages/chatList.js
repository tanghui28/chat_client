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
import {
  Iconfont
} from '../../font/index'

import config from '../config/config'

class ChatList extends React.Component { 
  constructor() { 
    super();
    this.state = {};
  }

  render() { 

    return (
      < Provider >
        <View>
          <Text>chatList</Text>
           <Iconfont name="icon-wode" size={68} color="#E00"></Iconfont>
        </View>
      </ Provider>
    )

  }

}



export default ChatList;