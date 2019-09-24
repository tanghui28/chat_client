/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {
  Net
} from './src/config/request'

// 引入iconfont
import {
  Iconfont
} from './font/index'

global.Net = Net;

import Login from './src/pages/login'
import Register from './src/pages/register'
import Choose from './src/pages/choose'
import ChatList from './src/pages/chatList'
import FriendsList from './src/pages/friendsList'
import Mine from './src/pages/mine'
import UserDetail from './src/pages/userDetail'
import ModifyRemark from './src/pages/modifyRemark'
import ChatRoom from './src/pages/chatRoom'
import Wait from './src/pages/wait'

import {  createAppContainer} from 'react-navigation'
import {  createStackNavigator} from 'react-navigation-stack';
import {  createBottomTabNavigator} from 'react-navigation-tabs'
import config from './src/config/config';

// 内置转场动画
import CardStackStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator'

import Storage from './src/config/storage'


Storage.setData('chatList', JSON.stringify([
  {
    user_id :6,
    remark: 'A小王',
    avatar: 'http://192.168.1.21:3000/images/6.jpeg',
    replyTime: '2019-09-06',
    lastMsg: '',
    unread:1
  },
  {
    user_id :7,
    remark: 'A小唐',
    avatar: 'http://192.168.1.21:3000/images/7.jpeg',
    replyTime: '2019-09-06',
    lastMsg: '',
    unread:1
  },
  {
    user_id :8,
    remark: 'A小阳',
    avatar: 'http://192.168.1.21:3000/images/8.jpeg',
    replyTime: '2019-09-06',
    lastMsg: '',
    unread:0
  },
  {
    user_id :9,
    remark: 'A小平',
    avatar: 'http://192.168.1.21:3000/images/9.jpeg',
    replyTime: '2019-09-06',
    lastMsg: '',
    unread:0
  },

]))


// 示例存储 聊天信息  uesr_id+'charRmom'
Storage.setData('6chatRoom', JSON.stringify(
  [
    {
      text: '你好吗ffffff?',
      type: 0,
      time: 1568098926233
    },
    {
      text: '我很好!',
      type: 1,
      time: 1568098926234
    },
    {
      text: '你叫什么名字?',
      type: 0,
      time: 1568098926235
    },
    {
      text: '尼古拉斯赵四',
      type: 1,
      time: 1568098926236
    },
    {
      text: '你是明星吗?',
      type: 0,
      time: 1568098926237
    },
    {
      text: '为什么名字那么难听?',
      type: 0,
      time: 1568098926238
    },
    {
      text: '怎么不说话了?怎么不说话啊?怎么不说话啊?怎么不说话啊怎么不说话啊怎么不说话啊',
      type: 0,
      time: 1568098926238
    },
    {
      text: '说话啊',
      type: 0,
      time: 1568098926240
    },
    {
      text: '哦',
      type: 1,
      time: 1568098926242
    },
    {
      text: '哦',
      type: 1,
      time: 1568098926242
    },
    {
      text: '哦',
      type: 1,
      time: 1568098926242
    },
    {
      text: '哦',
      type: 1,
      time: 1568098926242
    },
    {
      text: '哦',
      type: 1,
      time: 1568098926242
    },
    {
      text: '哦',
      type: 1,
      time: 1568098926242
    },
    {
      text: '哦',
      type: 1,
      time: 1568098926242
    },
  ]
))




// redux  reducers
// import reducer from './src/reducers/index'
// // redux
// import { createStore } from 'redux'
import { Provider } from 'react-redux'
// // actions 
import { setFriend,setChatFriend } from './src/actions/index'

// const store = createStore(reducer);
import store from './src/store/store'

// 读取好友列表
// Storage.getData('friendList').then(res=>{
//   if( res != null ){
//     store.dispatch(setFriend(
//       res
//     ))
//   }
// })

// 读取聊天列表
Storage.getData('chatList').then(res=>{
  if( res != null ){
    store.dispatch(setChatFriend(
      res
    ))
  }
})

const bottomTabNavigator = createBottomTabNavigator(
  {
    chat: {
      screen: ChatList,
      navigationOptions: {
        tabBarLabel: '消息',
        tabBarIcon: ({focused,tintColor}) => { 
          return (
            <Iconfont name="icon-xiaoxi" size={30} color={tintColor} ></Iconfont>
          )
        }
      }
    },
    friends: {
      screen: FriendsList,
      navigationOptions: {
        tabBarLabel: '通讯录',
        tabBarIcon: ({focused,tintColor}) => { 
          return (
            <Iconfont name="icon-tongxunlu" size={30} color={tintColor} ></Iconfont>
          )
        }
      }
    },
    mine: {
      screen: Mine,
      navigationOptions: {
        tabBarLabel: '我的',
        tabBarIcon: ({focused,tintColor}) => { 
          return (
            <Iconfont name="icon-wode" size={30} color={tintColor} ></Iconfont>
          )
        }
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        height:50
      },
      activeTintColor: config.primaryColor,
      inactiveTintColor: config.darkGray
    }

  }
)


const RootNavigator = createStackNavigator(
  {
    Wait: {
      screen: Wait,
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
    bottomTabNavigator: {
      screen: bottomTabNavigator,
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
    },
    UserDetail: {
      screen: UserDetail,
      navigationOptions: {
        gesturesEnabled: true,
        header: null
      }
    },
    ModifyRemark:{
      screen:ModifyRemark,
      navigationOptions: {
        gesturesEnabled: true,
        header: null
      }
    },
    ChatRoom: {
      screen: ChatRoom,
      navigationOptions: {
        gesturesEnabled: true,
        header: null
      }
    }
  
  },
  {
    transitionConfig: () => ({
      screenInterpolator: CardStackStyleInterpolator.forHorizontal
      
    })
  }
)

const AppContainer = createAppContainer(RootNavigator);



const App = () => {
  return (
    < Provider store={store} >
      < AppContainer />
    </ Provider>
  );
};



export default App;
