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
    this.state = {
      list: {
        A: [
          {
            uid:1,
            uname: "A小王",
            avatar:'male.png'
          },
          {
            uid:2,
            uname: "A小唐",
            avatar:'male.png'
          },
        ],
        B: [
          {
            uid: 3,
            uname: "B小李",
            avatar: 'male.png'
          },
          {
            uid: 4,
            uname: "B小李",
            avatar: 'male.png'
          },
        ],
        C: [
          {
            uid: 5,
            uname: "陈龙",
            avatar: 'male.png'
          },
          {
            uid: 5,
            uname: "成龙",
            avatar: 'male.png'
          }
        ]
      }
    };
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