import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Image
} from 'react-native';

import {
  Provider,
  Toast,
  List,
  SwipeAction
} from '@ant-design/react-native'

import {
  Iconfont
} from '../../font/index'

import config from '../config/config'


class ChatList extends React.Component { 
  constructor() { 
    super();
    this.state = {
      list: [
        {
          uname: '尼古拉斯赵四',
          avatar: 'male.png',
          replyTime: '2019-09-06',
          lastMsg:'where you from and wher you going'
        },
        {
          uname: '尼古拉斯赵四',
          avatar: 'male.png',
          replyTime: '2019-09-06',
          lastMsg:'where you from and wher you going'
        },
        {
          uname: '尼古拉斯赵四',
          avatar: 'male.png',
          replyTime: '2019-09-06',
          lastMsg:'where you from and wher you going'
        },
        {
          uname: '尼古拉斯赵四',
          avatar: 'male.png',
          replyTime: '2019-09-06',
          lastMsg:'where you from and wher you going'
        },
        {
          uname: '尼古拉斯赵四',
          avatar: 'male.png',
          replyTime: '2019-09-06',
          lastMsg:'where you from and wher you going'
        },
        {
          uname: '尼古拉斯赵四',
          avatar: 'male.png',
          replyTime: '2019-09-06',
          lastMsg:'where you from and wher you going'
        },
        {
          uname: '尼古拉斯赵四',
          avatar: 'male.png',
          replyTime: '2019-09-06',
          lastMsg:'where you from and wher you going'
        },
        {
          uname: '尼古拉斯赵四',
          avatar: 'male.png',
          replyTime: '2019-09-06',
          lastMsg:'where you from and wher you going'
        },
        {
          uname: '尼古拉斯赵四',
          avatar: 'male.png',
          replyTime: '2019-09-06',
          lastMsg:'where you from and wher you going'
        },
        {
          uname: '尼古拉斯赵四',
          avatar: 'male.png',
          replyTime: '2019-09-06',
          lastMsg:'where you from and wher you going'
        },
      ]
    };
  }

  componentDidMount() { 
  
  }
  render() { 

    const left = [{
      text: "标为未读",
       style: {
         backgroundColor: config.defaultColor,
         color: config.whiteFont,
         width:40
      },
      onPress: () => { 
        console.log(111)
      }
    }];
    const right = [
      {
        text: '置顶',
         style: {
           backgroundColor: config.primaryColor,
           color: config.whiteFont
        },
         onPress: () => {
           console.log(111)
         }
      },
      {
        text: '删除',
        style: {
          backgroundColor: config.dangerColor,
          color:config.whiteFont
        },
        onPress: () => {
          console.log(111)
        }
      }
    ]

    return (
      < Provider >
        <View>
          <Text>chatList</Text>
          <List>
              {

                this.state.list.map((item, key) => {

                  return (
                    <SwipeAction  autoClose key={key} right={right} left={left} >
                      <List.Item >     
                        <View style={styles.item} >
                          < Image style={ styles.avatar } source={ require('../assets/img/male.png') }></ Image>
                          <View style={styles.itemRight}>
                            <View style={styles.title} >
                              <Text>name</Text>
                              <Text>time</Text>
                            </View>
                            <Text numberOfLines={1} ellipsizeMode="tail">1111111111111111111111111111111111111111111</Text>
                          </View>
                         
                        </View>
                      </List.Item>
                    </SwipeAction>
                  )
    
                })
                    
              }
                
          </List>
        </View>
      </ Provider>
    )

  }
}



const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height:50
  },
  item: {
    height: 70,
    flexDirection:'row'
  },
  itemRight: {
    flex: 1,
    position: 'relative',
    paddingLeft:10
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height:'50%'
  },
  lastMsg: {

  }

})



export default ChatList;