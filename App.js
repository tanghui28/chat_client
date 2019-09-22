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
Storage.setData('friendList1', JSON.stringify([
  {
    title: 'A',
    data: [{
        user_id: 1,
        uname: "A小王8",
        avatar: 'male.png',
        phone: '18161046533'
      },
      {
        user_id: 2,
        uname: "A小唐",
        avatar: 'male.png',
        phone: '18161046533'
      },
      {
        user_id: 2,
        uname: "A小唐",
        avatar: 'male.png',
        phone: '18161046533'
      },
      {
        user_id: 2,
        uname: "A小唐",
        avatar: 'male.png',
        phone: '18161046533'
      },
    ]
  },
  {
    title: 'B',
    data: [{
        user_id: 3,
        uname: "B小李",
        avatar: 'male.png',
        phone: '18161046533'
      },
      {
        user_id: 4,
        uname: "B小李",
        avatar: 'male.png',
        phone: '18161046533'
      },
      {
        user_id: 4,
        uname: "B小李",
        avatar: 'male.png',
        phone: '18161046533'
      },
      {
        user_id: 4,
        uname: "B小李",
        avatar: 'male.png',
        phone: '18161046533'
      },
    ]
  },
  {
    title: "C",
    data: [{
        user_id: 5,
        uname: "成龙",
        avatar: 'male.png',
        phone: '18161046533'
      },
      {
        user_id: 6,
        uname: "成龙",
        avatar: 'male.png',
        phone: '18161046533'
      },
      {
        user_id: 6,
        uname: "车龙",
        avatar: 'male.png',
        phone: '18161046533'
      },
    ]
  },
  {
    title: "D",
    data: [{
        user_id: 5,
        uname: "大龙",
        avatar: 'male.png'
      },
      {
        user_id: 6,
        uname: "大龙",
        avatar: 'male.png'
      },
      {
        user_id: 6,
        uname: "大龙",
        avatar: 'male.png'
      },
      {
        user_id: 6,
        uname: "大龙",
        avatar: 'male.png'
      },
      {
        user_id: 6,
        uname: "大龙",
        avatar: 'male.png'
      },
      {
        user_id: 6,
        uname: "大龙",
        avatar: 'male.png'
      },
      {
        user_id: 6,
        uname: "大龙",
        avatar: 'male.png'
      },
      {
        user_id: 6,
        uname: "大龙",
        avatar: 'male.png'
      },
      {
        user_id: 6,
        uname: "大龙",
        avatar: 'male.png'
      },

    ]
  },
]))

Storage.setData('chatList', JSON.stringify([
  {
    user_id :1,
    uname: '尼古拉斯赵四',
    avatar: 'http://192.168.1.5:3000/images/1.jpeg',
    replyTime: '2019-09-06',
    lastMsg:'where you from and wher you going'
  },
  {
    user_id :2,
    uname: '尼古拉斯赵四',
    avatar: 'http://192.168.1.5:3000/images/2.jpg',
    replyTime: '2019-09-06',
    lastMsg:'where you from and wher you going'
  },
  {
    user_id :3,
    uname: '尼古拉斯赵四',
    avatar: 'http://192.168.1.5:3000/images/3.jpeg',
    replyTime: '2019-09-06',
    lastMsg:'where you from and wher you going'
  },
  {
    user_id :4,
    uname: '尼古拉斯赵四',
    avatar: 'http://192.168.1.5:3000/images/1.jpeg',
    replyTime: '2019-09-06',
    lastMsg:'where you from and wher you going'
  },
  {
    user_id :5,
    uname: '尼古拉斯赵四',
    avatar: 'http://192.168.1.5:3000/images/1.jpeg',
    replyTime: '2019-09-06',
    lastMsg:'where you from and wher you going'
  },
  {
    user_id :6,
    uname: '尼古拉斯赵四',
    avatar: 'http://192.168.1.5:3000/images/1.jpeg',
    replyTime: '2019-09-06',
    lastMsg:'where you from and wher you going'
  },
  {
    user_id :7,
    uname: '尼古拉斯赵四',
    avatar: 'http://192.168.1.5:3000/images/1.jpeg',
    replyTime: '2019-09-06',
    lastMsg:'where you from and wher you going'
  },
  {
    user_id :8,
    uname: '尼古拉斯赵四',
    avatar: 'http://192.168.1.5:3000/images/1.jpegmale.png',
    replyTime: '2019-09-06',
    lastMsg:'where you from and wher you going'
  },
  {
    user_id :9,
    uname: '尼古拉斯赵四',
    avatar: 'http://192.168.1.5:3000/images/1.jpeg',
    replyTime: '2019-09-06',
    lastMsg:'where you from and wher you going'
  },
  {
    user_id :10,
    uname: '尼古拉斯赵四',
    avatar: 'http://192.168.1.5:3000/images/1.jpeg',
    replyTime: '2019-09-06',
    lastMsg:'where you from and wher you going'
  },
  {
    user_id :11,
    uname: '尼古拉斯赵四',
    avatar: 'http://192.168.1.5:3000/images/1.jpeg',
    replyTime: '2019-09-06',
    lastMsg:'where you from and wher you going'
  },
  {
    user_id :12,
    uname: '尼古拉斯赵四',
    avatar: 'http://192.168.1.5:3000/images/1.jpeg',
    replyTime: '2019-09-06',
    lastMsg:'where you from and wher you going'
  },
  {
    user_id :13,
    uname: '尼古拉斯赵四',
    avatar: 'http://192.168.1.5:3000/images/1.jpeg',
    replyTime: '2019-09-06',
    lastMsg:'where you from and wher you going'
  },
  {
    user_id :14,
    uname: '尼古拉斯赵四',
    avatar: 'http://192.168.1.5:3000/images/1.jpeg',
    replyTime: '2019-09-06',
    lastMsg:'where you from and wher you going'
  },
]))




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
