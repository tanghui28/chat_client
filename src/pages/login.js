import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

import { NavigationActions,StackActions } from 'react-navigation'

import config from '../config/config'

import Storage from '../config/storage'

import {
  Provider,
  Toast
} from '@ant-design/react-native'

class Login extends React.Component { 

  constructor() { 
    super();
    this.state = {
      uname: '',
      password: '',
      mine:{},
    }
  }

  login = () => {
    Net('/login', {
      uname: this.state.uname,
      password:this.state.password
    }).then(res => { 
      if (res.success) {
        console.log(res);
        // this.getFriendListFromStorage(res.data.user_id);
        this.setState({
          mine:{
            avatar: res.data.avatar,
            forbidden: res.data.forbidden,
            gender: res.data.gender,
            phone: res.data.phone,
            token: res.data.token,
            uname: res.data.uname,
            user_id: res.data.user_id
          }
        })
        // dispatch 用户信息
        this.props.login({
          avatar: res.data.avatar,
          forbidden: res.data.forbidden,
          gender: res.data.gender,
          phone: res.data.phone,
          token: res.data.token,
          uname: res.data.uname,
          user_id: res.data.user_id
        });
        Storage.setData('userInfo',JSON.stringify({
          avatar: res.data.avatar,
          forbidden: res.data.forbidden,
          gender: res.data.gender,
          phone: res.data.phone,
          token: res.data.token,
          uname: res.data.uname,
          user_id: res.data.user_id
        }))
        // dispatch friendList
        this.props.setFriend(res.data.friendList);
        // 接收为接收的friend_message
        let timer = setInterval(() => {
          if (global.hasGetChatList) { 
            clearInterval(timer);
            // console.log(this.props.chatList)
            res.data.friendList.forEach(item => { 
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
                    // console.log('已开启' + friend.friend_id, '下标' + hasOpenChatIndex)
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
                    // console.log('未开启' + friend.friend_id, friend.avatar);
                    let obj = {
                      user_id: friend.friend_id,
                      remark: friend.friend_remark,
                      avatar: friend.avatar,
                      replyTime: now,
                      lastMsg: messages[messages.length - 1],
                      unread: messages.length
                    }
                    // console.log(obj);
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

        // 存储friendList
        Storage.setData('friendList',JSON.stringify(res.data.friendList));
        const  resetAction = StackActions.reset({
                  index: 0,
                  actions: [
                      NavigationActions.navigate({routeName:'bottomTabNavigator'})//要跳转到的页面名字
                  ]
              });
        this.props.navigation.dispatch(resetAction);

      } else { 
        Toast.fail(res.info)
      }
    }).catch(err => { 
      
      Toast.fail('网络错误')

    })

  };

  getFriendListFromStorage(user_id){
    Storage.getData('friendList'+user_id).then(res=>{
      if( res != null ){
        // store.dispatch(setFriend(
        //   res
        // ))
        this.props.setFriend(res)
      }
    })
  }

  passwordChange = (val) => {

    this.setState({
      password: val,
    })

  };


  render() {
  
    return (
      <Provider>
        <View style={[styles.viewContainer]}>
        <TextInput onChangeText={ (uname) => { this.setState({uname}) } } value={this.state.uname} style={ styles.input } placeholder="用户名或手机号" />
        <TextInput   onChangeText={this.passwordChange}  value={this.state.password} style={ styles.input } secureTextEntry={true}  placeholder="密码" />
        
           <TouchableOpacity onPress={this.login} style={styles.regBtn}>
            <Text style={{color:config.whiteFont}}>登录</Text>
          </TouchableOpacity>
        
       
        </View>
      </Provider>
    )

  }

}


const styles = StyleSheet.create({
  viewContainer: {
    paddingTop: 80,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'

  },
  input: {
    borderBottomWidth: 1,
    borderColor: config.darkGray,
    borderStyle: 'solid',
    width: config.screenWidth - 40
  },
  regBtn: {
    backgroundColor: config.btnPrimaryColor,
    height: 40,
    width: config.screenWidth - 40,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  }
})

import {connect } from 'react-redux'
import {setMINE,setFriend,modifyChatFriend,addChatFriend} from '../actions/index'
import store from '../store/store';

const mapStateToProps = store => { 
  return {
    chatList:store.chatList
  }
}
const mapDispatchToProps = dispatch => { 
  return {
   login:payload=>{
    dispatch(setMINE(payload))
   },
   setFriend:payload=>{
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




export default connect(mapStateToProps,mapDispatchToProps)(Login);