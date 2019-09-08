import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
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

import Header from '../components/header'


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
        {
          uname: '尼古拉斯赵四',
          avatar: '20.jpeg',
          replyTime: '2019-09-06',
          lastMsg:'where you from and wher you going'
        },
        {
          uname: '尼古拉斯赵四',
          avatar: '20.jpeg',
          replyTime: '2019-09-06',
          lastMsg:'where you from and wher you going'
        },
        {
          uname: '尼古拉斯赵四',
          avatar: '20.jpeg',
          replyTime: '2019-09-06',
          lastMsg:'where you from and wher you going'
        },
        {
          uname: '尼古拉斯赵四',
          avatar: '20.jpeg',
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
           backgroundColor: "#00CC99",
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
        <Header style={{backgroundColor:config.lightGray}} showIcon={true} title="消息"></Header>
        <ScrollView showsVerticalScrollIndicator={false} styl={ {flex:1} }>
          <List>
              {

                this.state.list.map((item, key) => {

                  return (
                    <SwipeAction  autoClose key={key} right={right} left={left} >
                      <List.Item >     
                      <TouchableOpacity TouchableOpacity={0.9}>
                        <View style={styles.item} >
                          < Image style={ styles.avatar } source={ require('../assets/img/20.jpeg') }></ Image>
                          <View style={styles.itemRight}>
                            <View style={styles.title} >
                              <Text numberOfLines={1} ellipsizeMode="tail">{item.uname}</Text>
                              <Text>{item.replyTime}</Text>
                            </View>
                            <Text style={styles.lastMsg} numberOfLines={1} ellipsizeMode="tail">{item.lastMsg}</Text>
                          </View>
                         
                        </View>
                        </TouchableOpacity>
                      </List.Item>
                    </SwipeAction>
                  )
    
                })
                    
              }
                
          </List>
        </ScrollView>
      </ Provider>
    )

  }
}



const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height:50,
    borderRadius:6
  },
  item: {
    height: 60,
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
    paddingRight:24
  }

})



export default ChatList;