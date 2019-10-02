import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  Keyboard,
  ToastAndroid
} from 'react-native'
import config from '../config/config'
import Header from '../components/header'

import Storage from '../config/storage'

class ChatRoom extends React.Component { 
  constructor() { 
    super();
    this.flatList = React.createRef();

    this.state = {

      userInfo: {
        uid: 1,
        uname: "A小王",
        avatar: 'male.png',
        phone: '18161046533'
      },
      //type 0对方     1自己
      /* messages: [
        {
          text: '你好吗?',
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
      ], */
      messages: [],
      allMessages:[],
      msg: '',
      refreshing:false,

    };
  }


  back = () => {
    this.props.navigation.goBack();
  };
  componentWillMount() { 
    //读取聊天记录
    // console.log(this.props.navigation.state,this.props.mine.user_id)
    // console.log(this.props.navigation.state.params)
    Storage.getData(this.props.navigation.state.params + 'chatRoom'+this.props.mine.user_id).then(res => { 
      // console.log(res);
      if (res) { 
        
        // 将读取的聊天记录赋值给state中的messages , 每次下拉赋值8条
        if (res.length > 0 && res.length <= 8) {
          this.props.setChatRecord(res);
        } else if (res.length > 0 && res.length > 8) { 
          let messages = res.splice(res.length - 8, 8);
          this.props.setChatRecord(messages);
        }
        this.setState({
          allMessages: res,
        })
        // this.props.setChatRecord(res);
        this.modifyChatList();

      }
      
    })


  }
  componentDidMount() { 
    setTimeout(() => {
      this.flatList.current.scrollToEnd();
    }, 100);
    this.KeyboardDidShow = Keyboard.addListener('keyboardDidShow', () => { 
      setTimeout(() => {
        this.flatList.current.scrollToEnd();
      }, 50);
    })

  }
  componentWillUnmount() { 
    // 移除键盘监听
    this.KeyboardDidShow.remove();
    // 清空当前聊天对象信息
    this.props.setChatTo({});
    // 清除store 中的聊天记录
    this.props.setChatRecord([]);

  }
  componentWillReceiveProps(next){
    // console.log(this.props.chatRecord)
    let prevText = this.props.chatRecord.length > 0 ? this.props.chatRecord[this.props.chatRecord.length -1]['text']:'';
    let nowText = next.chatRecord.length > 0 ?next.chatRecord[next.chatRecord.length-1]['text']:'';
    if(prevText != nowText){
      this.scroll();
    }
    // console.log(now.chatRecord[now.chatRecord.length - 1].text)
    // console.log(now.chatRecord[now.chatRecord.length - 1].text,next.chatRecord[next.chatRecord.length - 1].text)
  }
  // 发送消息
  sendMsg = () => { 
    if (this.state.msg === "") { 
      return;
    }
    global.ws.send(JSON.stringify({
      from: this.props.mine.user_id,
      to: this.props.talkUserInfo.user_id,
      body:this.state.msg
    }))

    this.props.addChatRecord({
      text: this.state.msg,
      type: 1,
      time: Date.now()
    })
    this.setState({ msg: '' });
    this.modifyChatList();
    this.saveMessages();
    // this.scroll();

    

    
  }
  // 存储数据
  saveMessages() {
    setTimeout(() => {
      Storage.setData(this.props.talkUserInfo.user_id + 'chatRoom' + this.props.mine.user_id, JSON.stringify(this.props.chatRecord))
    }, 100);
  }
  // 修改当前聊天对象的聊天缩略信息(chatList显示内容)
  modifyChatList() { 
    let user_id = this.props.talkUserInfo.user_id;
    let index = null;
    this.props.chatList.forEach((item, i)=> {
      if (item.user_id == user_id) { 
        index = i;
      }
    });
    if (index === null) {
      return;
    }
    // console.log(user_id)
    // console.log(this.state.messages)
    setTimeout(()=>{
      this.props.modifyChatFriend({
        index,
        detail: {
          user_id,
          remark: this.props.talkUserInfo.remark,
          avatar: this.props.talkUserInfo.avatar,
          replyTime: this.props.chatRecord.length > 0 ? this.props.chatRecord[this.props.chatRecord.length-1]['time']:'',
          lastMsg: this.props.chatRecord.length > 0 ?  this.props.chatRecord[this.props.chatRecord.length-1]['text'] :'',
          unread: 0
        }
      })
    },500)
    

  }
  // 滚动到最底部
  scroll(){
    setTimeout(() => {
      this.flatList.current.scrollToEnd();
    }, 50);
  }
  //下拉加载更多聊天记录
  pullDown = () => {

    if (this.state.allMessages.length <= 0) { 
      ToastAndroid.show('已加载全部聊天记录', ToastAndroid.SHORT);
      return;
    }
    let allMessages = this.state.allMessages.slice(0);
    let add = [];
    if (allMessages.length > 8) {
      add = allMessages.splice(allMessages.length - 8, 8);
    } else { 
      add = allMessages.splice(0);
    }
    this.setState({
      allMessages
    })

    this.props.addChatRecordTop(add);
  

  };
  render() { 
    return (
      <View style={styles.container}>
        <Header backFun={this.back} title={this.props.talkUserInfo.remark} showBack={true} showBack={true}></Header>
        < FlatList
          ref={this.flatList}
          refreshing={this.state.refreshing}
          onRefresh={this.pullDown}
          data={this.props.chatRecord}
          keyExtractor={
            (item,index) => { 
              return index+''
            }
          }
          renderItem={
            ({ item, index }) => { 
              return (
                <View style={ item.type == 0 ? styles.leftView :styles.rightView }>
                  < Image style={styles.avatar} source={{ uri: item.type == 0 ? this.props.talkUserInfo.avatar :this.props.mine.avatar}} ></ Image>
                  <View style={item.type == 0? styles.leftTextContainer : styles.rightTextContainer}>
                    <Text style={styles.text}> {item.text}</Text>
                    <Text style={ item.type == 0? styles.leftArrow:styles.rightArrow}></Text>
                  </View>
                  
                </View>
              )
              
            }
          }
        >
        </ FlatList>
        
        {/* 下方输入条 */}
        <View style={styles.bottomBar}>
          <TextInput onChangeText={(msg) => { this.setState({msg:msg.trim()}) } } value={this.state.msg} multiline={true} style={styles.input}></TextInput>
          <TouchableOpacity onPress={this.sendMsg} style={styles.sendBtn}>
            <Text style={{color:config.whiteFont}}>发送</Text>
          </TouchableOpacity>
        </View>



      </View>
    )
   

  }

}
ChatRoom.defaultProps = {
  chatRecord:[]
}

const styles = StyleSheet.create({
  sendBtn: {
    backgroundColor: config.primaryColor,
    borderRadius: 6,
    width: 60,
    height: 35,
    justifyContent: 'center',
    alignItems:'center'
    
  },
  input: {
    width: config.screenWidth - 100,
    backgroundColor: config.whiteFont,
    height: 40,
    borderRadius:6
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderTopColor: config.lightGray,
    borderTopWidth: 0.5,
    flexDirection: 'row',
    height: 60,
    width:'100%',
    backgroundColor: config.pageBgColor,
    zIndex: 99,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'space-between',
    alignItems:'center'
  },


  container: {
    backgroundColor: config.pageBgColor,
    flex: 1,
    position: 'relative',
    paddingBottom: 60
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 6
  },
  leftView: {
    width: config.screenWidth - 100,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    padding:10
  },
  rightView: {
    width: config.screenWidth - 100,
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignSelf: 'flex-end',
    padding: 10,
    
  },
  leftTextContainer: {
    backgroundColor: config.whiteFont,
    borderRadius: 6,
    position: 'relative',
    padding: 10,
    marginLeft:15
  },
  rightTextContainer: {
    backgroundColor: config.whiteFont,
    borderRadius: 6,
    position: 'relative',
    padding: 10,
    marginRight: 15,
    backgroundColor:'#98F898',
  },
  text: {

  },
  leftArrow: {
    width: 10,
    height: 10,
    position: 'absolute',
    top: 15,
    left: -5,
    backgroundColor: config.whiteFont,
    transform: [{rotate:'45deg'}]
  },
  rightArrow: {
    width: 10,
    height: 10,
    position: 'absolute',
    top: 15,
    right: -5,
    transform: [{
      rotate: '45deg'
    }],
    backgroundColor:'#98F898',
  },
  

})


import { connect } from 'react-redux'

import { modifyChatFriend, setChatTo, setChatRecord, addChatRecord, addChatRecordTop} from '../actions/index'

const mapStateToProps = store => { 
  return {
    talkUserInfo: store.talkUserInfo,
    chatList: store.chatList,
    mine: store.mine,
    chatRecord: store.chatRoom
  }
}

const mapDispatchToProps = dispatch => { 
  return {
    modifyChatFriend: payload => { 
      dispatch(modifyChatFriend(payload))
    },
    setChatTo: payload => {
      dispatch(setChatTo(payload));
    },
    setChatRecord: payload => { 
      dispatch(setChatRecord(payload))
    },
    addChatRecord: payload => { 
      dispatch(addChatRecord(payload))
    },
    addChatRecordTop: payload => { 
      dispatch(addChatRecordTop(payload))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);