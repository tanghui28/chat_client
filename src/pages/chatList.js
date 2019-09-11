import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
  FlatList
} from 'react-native';

import {
  Provider,
  Toast,
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

  toChatRoom = () => { 
    this.props.navigation.navigate('ChatRoom');
  };

  render() { 


    return (
      < Provider >
        <Header style={{backgroundColor:config.lightGray}} showIcon={true} title="消息"></Header>

        <FlatList
            initialNumToRender={10}
            data={this.state.list}
            keyExtractor = {
              (item,index) => String(index)
            }
            renderItem={({ item, index }) => { 
              return (
    
                <TouchableOpacity onPress={this.toChatRoom} activeOpacity={0.85} >
                      <View style={styles.item} >
                        < Image style={ styles.avatar } source={{uri:'http://192.168.1.9:3000/images/male.png'}}></ Image>
                        <View style={styles.itemRight}>
                          <View style={styles.title} >
                            <Text numberOfLines={1} ellipsizeMode="tail">{item.uname}</Text>
                            <Text style={styles.replyTime}>{item.replyTime}</Text>
                          </View>
                          <Text style={styles.lastMsg} numberOfLines={1} ellipsizeMode="tail">{item.lastMsg}</Text>
                        </View> 
                      </View>
                </TouchableOpacity>
            
              )
            }}
          ></FlatList>


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
    height: 80,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 10,
    alignItems: 'center'
  },
  itemRight: {
    flex: 1,
    position: 'relative',
    paddingLeft: 10,
    borderBottomColor: config.lightGray,
    borderBottomWidth: 0.5,
    height: '100%',
    justifyContent:'center'
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom:6
  },
  replyTime: {
    color:config.darkGray
  },
  lastMsg: {
    paddingRight: 24,
    color:config.darkGray
  }

})



export default ChatList;