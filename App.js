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
  Vibration,
} from 'react-native';
import {
  Net
} from './src/config/request'
global.Net = Net;
// 引入iconfont
import {
  Iconfont
} from './font/index'

// 公共方法
import utility from './src/config/utility'
global.utility = utility;


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
import Scan from './src/pages/scan'

import {  createAppContainer} from 'react-navigation'
import {  createStackNavigator} from 'react-navigation-stack';
import {  createBottomTabNavigator} from 'react-navigation-tabs'
import config from './src/config/config';

// 内置转场动画
import CardStackStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator'

import Storage from './src/config/storage'


// Storage.setData('chatList', JSON.stringify([
//   {
//     user_id :6,
//     remark: 'A小王',
//     avatar: 'http://192.168.1.9:3000/images/6.jpeg',
//     replyTime: '2019-09-06',
//     lastMsg: '',
//     unread:1
//   },

// ]))


// 示例存储 聊天信息  uesr_id(好友)+'charRmom'+user_id(自己)
//type 0 对方 1自己
// Storage.setData('6chatRoom1', JSON.stringify(
//   [
//     {
//       text: '尼古拉斯赵四',
//       type: 1,
//       time: 1568098926236
//     },
//     {
//       text: '你是明星吗?',
//       type: 0,
//       time: 1568098926237
//     },

//   ]
// ))

import { Provider } from 'react-redux'
// // actions 
import { setFriend, setChatFriend, modifyChatFriend, addChatFriend, setChatRecord, addChatRecord } from './src/actions/index'

import store from './src/store/store'


// 心跳检测   ws连接成功 , 启动一次性定时器发送消息给服务端 , 
// 若指定时间内未收到回复则断开ws连接, 
// 若指定时间内收到消息 则再次一次性定时器发送消息给服务器
// 
global.ws = null;                     //websocket 实例
let heartChaeck = {                     
  connecting:false,                   //正在连接
  timeout: 5000,                     //心跳检测间隔
  timeoutObj: null,                   
  serverTimeObj: null,
  storeTimeObj:null,
  createWebSocket() { 
    try {
      this.storeTimeObj = setInterval(() => {
        let userInfo = store.getState().mine;
        if (userInfo && userInfo.user_id != undefined) { 
          clearInterval(this.storeTimeObj);
          global.ws = new WebSocket('ws://'+config.url+'?user_id=' + userInfo.user_id);
          this.handlerMessage();
        }
      }, 2000);

    } catch (error) {
      this.reconnect();
    }

  },
  reconnect() { 
    if (this.connecting) return;
    this.connecting = true;
    setTimeout(() => {
      this.createWebSocket();
      this.connecting = false;
    }, 3000);
  },
  startHeartCheck() {
    this.timeoutObj && clearTimeout(this.timeoutObj);
    this.serverTimeObj && clearTimeout(this.serverTimeObj);

    this.timeoutObj = setTimeout(() => {
      global.ws.send('ping');
      this.serverTimeObj = setTimeout(() => {
        //指定时间内未收到后端返回心跳 , 关闭ws连接
        global.ws.close();
      }, this.timeout);
    }, this.timeout);

  },
  handlerMessage() { 

    global.ws.onopen = () => { 
      this.startHeartCheck();
    }
    global.ws.onmessage = async(e) => { 
      this.startHeartCheck();
      if ( e.data === "ping" ) {
        return;
      }
      // 更新好友
      if(e.data === "updateFriend"){
        Net('friendList').then(res => { 
          if (res.success) { 
            store.dispatch(setFriend(res.data))
            // 遍历好友列表,寻找未接受的消息friend_message
            let timer = setInterval(() => {
              if (global.hasGetChatList) { 
                clearInterval(timer);
                let chatList = store.getState().chatList;
                res.data.forEach(item => { 
                  item.data.forEach(friend => { 
                    friend.friend_message = friend.friend_message.trim();
                    let messages = [];
                    if (friend.friend_message) {  //有未接收消息
                      messages = friend.friend_message.split(',');
                    }
                    if ( messages.length > 0 ) { 
    
                      // 是否已与消息发送方在chatList开启聊天
                      let hasOpenChatIndex = null,
                        hasOPenChatDetail = null,
                        now = Date.now();
                      let hasOpenChat = chatList.some((chat,i) => { 
                        if (chat.user_id == friend.friend_id) { 
                          hasOpenChatIndex = i;
                          hasOPenChatDetail = chat;
                        }
                        return chat.user_id == friend.friend_id;
                      })
                       
                      if (hasOpenChat) {  //已开启聊天缩略 , 修改缩略
                        // 更改store中的chatList缩略信息
                        // console.log('已开启' + friend.friend_id, '下标' + hasOpenChatIndex)
                        store.dispatch(modifyChatFriend({
                          index: hasOpenChatIndex,
                          detail: {
                            user_id: hasOPenChatDetail.user_id,
                            remark: hasOPenChatDetail.remark,
                            avatar: hasOPenChatDetail.avatar,
                            replyTime: now,
                            lastMsg: messages[messages.length - 1],
                            unread: hasOPenChatDetail.unread + messages.length
                          }
                        }))
                        // this.props.modifyChatFriend({
                        //   index: hasOpenChatIndex,
                        //   detail: {
                        //     user_id: hasOPenChatDetail.user_id,
                        //     remark: hasOPenChatDetail.remark,
                        //     avatar: hasOPenChatDetail.avatar,
                        //     replyTime: now,
                        //     lastMsg: messages[messages.length - 1],
                        //     unread: hasOPenChatDetail.unread + messages.length
                        //   }
                        // })
    
                      } else {          //未开启聊天缩略  , 开启缩略
                        let obj = {
                          user_id: friend.friend_id,
                          remark: friend.friend_remark,
                          avatar: friend.avatar,
                          replyTime: now,
                          lastMsg: messages[messages.length - 1],
                          unread: messages.length
                        }
                        store.dispatch(addChatFriend(obj))

                      }
    
                      // {
                      //   text: '你好吗ffffff?',
                      //   type: 0,
                      //   time: 1568098926233
                      // }
                      //存储聊天记录
                      let newRecordArr = [];
                      for (let msg of messages) { 
                        newRecordArr.push({
                          text: msg,
                          type: 0,
                          time: now
                        })
                      }
                      global.utility.storeAddRecordLarge(friend.friend_id, this.state.mine.user_id, newRecordArr)

                    }
    
                  })
    
                })
    
    
    
              }
            }, 1000);
    
          }
        })
        return;
      }

      // 消息处理
      let data = JSON.parse(e.data);
      // {from:1, to:6, body: 'hello'}
      let state = store.getState();
      let chatList = state.chatList;
      let talkTo = state.talkUserInfo;
      let friendList = state.friendList;
      let now = Date.now();

      // 判断chatList是否已开启与from用户的聊天
      let hasOpenChatIndex = null,
          hasOPenChatDetail = null;
      let hasOpenChat = chatList.some((item, i) => { 
        if (item.user_id == data.from) { 
          hasOpenChatIndex = i;
          hasOPenChatDetail = item;
        }
        return item.user_id == data.from;
      })


      if (hasOpenChat) {  //已在chatList页面中存在与该用户的聊天缩略  更改缩略 存储聊天记录 更改store

        // 当前是否正在与该用户聊天 , 更新store聊天内容
        if (talkTo.user_id == hasOPenChatDetail.user_id) {
          store.dispatch(addChatRecord({
            text: data.body,
            type: 0,
            time: now
          }))
        }

        // 更改store中的chatList缩略信息
        store.dispatch(modifyChatFriend({
          index: hasOpenChatIndex,
          detail: {
            user_id: hasOPenChatDetail.user_id,
            remark: hasOPenChatDetail.remark,
            avatar: hasOPenChatDetail.avatar,
            replyTime: now,
            lastMsg: data.body,
            unread: talkTo.user_id == hasOPenChatDetail.user_id ? 0 : hasOPenChatDetail.unread + 1
          }
        }))

        //存储聊天记录
        global.utility.storeAddRecord(data.from, data.to, {
          text: data.body,
          type: 0,
          time: now
        })

        


      } else {        //未与当前消息发送方在chatList页面开启聊天缩略  添加缩略并存储聊天记录
        // {
        //    user_id: 6,
        //    remark: 'A小王',
        //    avatar: 'http://192.168.1.9:3000/images/6.jpeg',
        //    replyTime: '2019-09-06',
        //    lastMsg: '',
        //    unread: 1
        // }
        let fromUserInfo = {};
        friendList.forEach(item => { 

          item.data.forEach(friend => { 
            if (data.from == friend.friend_id) { 
              fromUserInfo.user_id = friend.friend_id;
              fromUserInfo.remark = friend.friend_remark;
              fromUserInfo.avatar = friend.avatar;
              fromUserInfo.replyTime = now;
              fromUserInfo.lastMsg = data.body;
              fromUserInfo.unread = 1;
            }
          })

        })
        store.dispatch(addChatFriend(fromUserInfo));

        global.utility.storeAddRecord(data.from,data.to,{
          text: data.body,
          type: 0,
          time: now
        })


      }
      Vibration.vibrate(400);

    }
    global.ws.onerror = () => { 
      console.log('socket错误');
      this.reconnect();
    }
    global.ws.onclose = () => { 
      console.log('socket关闭');
      this.reconnect();
    }

  },
  
}
heartChaeck.createWebSocket();


// 读取聊天列表
global.hasGetChatList = false;
Storage.getData('chatList').then(res=>{
  if( res != null ){
    store.dispatch(setChatFriend(
      res
    ))
  }
  setTimeout(() => {
    global.hasGetChatList = true;
  }, 1000);
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
    },
    Scan: {
      screen: Scan,
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
