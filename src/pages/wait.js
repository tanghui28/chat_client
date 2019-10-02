import React from 'react'
import {
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'

import Storage from '../config/storage'

import { NavigationActions,StackActions } from 'react-navigation'

class Wait extends React.Component{
  constructor(){
    super();
    this.state = {
      mine: {}
    }
  }

  componentWillMount(){

    const toChoose = StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({routeName:'Choose'})//要跳转到的页面名字
        ]
    });
    const toMain = StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({routeName:'bottomTabNavigator'})//要跳转到的页面名字
        ]
    });

    Storage.getData('userInfo').then(res=>{

      if(res && res.token){
        Net('isLogin',{
          token:res.token
        }).then(data => {
          if (data.success) {
            this.setState({
              mine:data.data
            })
            this.getFriendList();
            this.props.setMine(data.data);
            this.props.navigation.dispatch(toMain);
          }else{

            this.props.navigation.dispatch(toChoose);
          }

        }).catch(err=>{
          console.log(err)
        })

      }else {
        this.props.navigation.dispatch(toChoose);
      }


    }).catch(err=>{

      this.props.navigation.dispatch(toChoose);
    })
  }

  // 从服务器获取好友列表
  getFriendList() { 
    Net('friendList').then(res => { 
      if (res.success) { 
        this.props.setFriend(res.data);
        // 遍历好友列表,寻找未接受的消息friend_message
        let timer = setInterval(() => {
          if (global.hasGetChatList) { 
            clearInterval(timer);
            // console.log(this.props.chatList)
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
                  let hasOpenChat = this.props.chatList.some((chat,i) => { 
                    if (chat.user_id == friend.friend_id) { 
                      hasOpenChatIndex = i;
                      hasOPenChatDetail = chat;
                    }
                    return chat.user_id == friend.friend_id;
                  })
                   
                  if (hasOpenChat) {  //已开启聊天缩略 , 修改缩略
                    // 更改store中的chatList缩略信息
                    this.props.modifyChatFriend({
                      index: hasOpenChatIndex,
                      detail: {
                        user_id: hasOPenChatDetail.user_id,
                        remark: hasOPenChatDetail.remark,
                        avatar: hasOPenChatDetail.avatar,
                        replyTime: now,
                        lastMsg: messages[messages.length - 1],
                        unread: hasOPenChatDetail.unread + messages.length
                      }
                    })

                  } else {          //未开启聊天缩略  , 开启缩略
                    let obj = {
                      user_id: friend.friend_id,
                      remark: friend.friend_remark,
                      avatar: friend.avatar,
                      replyTime: now,
                      lastMsg: messages[messages.length - 1],
                      unread: messages.length
                    }
                    this.props.addChatFriend(obj);

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
  }

  render(){

    return (
      <ImageBackground style={styles.backgroud} source={require('../assets/img/bg.jpg')}>
        <ActivityIndicator size="large" color="#aaa"></ActivityIndicator>
      </ImageBackground>
    )

  }

}


const styles = StyleSheet.create({
  backgroud: {
    flex:1,
    justifyContent:'center'
  },

})

import {connect} from 'react-redux'
import { setMINE, setFriend, modifyChatFriend, addChatFriend} from '../actions/index'

const mapStateToProps = store => { 
  return {
    chatList:store.chatList
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    setMine: payload => {
      dispatch(setMINE(payload))
    },
    setFriend: payload => {
      dispatch(setFriend(payload))
    },
    modifyChatFriend: payload => { 
      dispatch(modifyChatFriend(payload))
    },
    addChatFriend: payload => { 
      dispatch(addChatFriend(payload))
    }

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Wait);

