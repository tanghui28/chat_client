import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Icon,
} from '@ant-design/react-native'
import Header from '../components/header'

import config from '../config/config'

class UserDetail extends React.Component { 
  constructor() { 
    super();
    this.state = {
      userInfo: {

      }
    };
  }

  back = () => { 
    this.props.navigation.goBack();
  };

  toModify = ()=>{
    this.props.navigation.navigate('ModifyRemark')
  };

  componentWillMount() { 
    console.log(this.props.navigation.state.params)
    this.setState({
      userInfo:this.props.navigation.state.params
    })
  }

  toChatRoom = () => {
    console.log(this.props.chatList);
    let isChatting = this.props.chatList.some((item,i) => { 

      return item.user_id == this.state.userInfo.friend_id;

    })
    // 聊天列表中没有改用户 , 则创建聊天缩略信息
    if (!isChatting) { 
      this.props.addChatFriend({
        user_id: this.state.userInfo.friend_id,
        remark: this.state.userInfo.friend_remark,
        avatar: this.state.userInfo.avatar,
        replyTime: '',
        lastMsg: '',
        unread: 0
      })
    }
    
    this.props.setChatTo({
      user_id: this.state.userInfo.friend_id,
      remark: this.state.userInfo.friend_remark,
      avatar: this.state.userInfo.avatar,
    })
    this.props.navigation.navigate('ChatRoom')
  };

  render() {
    return (
      <View style={styles.container}>

        <Header style={{ backgroundColor: '#fff' }} backFun={this.back}  showBack={true}  ></Header>
        <View style={styles.topInfo}>
          <Image style={styles.avatar} source={{uri:this.state.userInfo.avatar}}></Image>
          <View style={styles.rightInfo}>
            <Text style={styles.topName}>{this.state.userInfo.uname}</Text>
            {
              this.state.userInfo.phone ? ( <Text style={styles.phone}>手机号:{this.state.userInfo.phone}</Text>) :null
            }
           
          </View>
        </View>

        <TouchableOpacity onPress={this.toModify} style={{marginTop:10}} activeOpacity={0.6}>
          <View style={styles.set}>
      
            <Text style={{fontSize:config.fontSizeLarge}}>设置备注和标签</Text>
            <Icon size={18} name="right"></Icon>

          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6}>
          <View style={styles.set}>
      
            <Text style={{fontSize:config.fontSizeLarge}}>ta的动态</Text>
            <Icon size={18} name="right"></Icon>

          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.toChatRoom} style={styles.sendMessage} activeOpacity={0.8}>
          <Icon color="#fff" size={18} name="message"></Icon>
          <Text style={{ color:config.whiteFont,marginLeft:10}}>发消息</Text>
        </TouchableOpacity>

      </View>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.pageBgColor
  },
  topInfo: {
    height: 140,
    paddingLeft: 20,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 6
  },
  rightInfo: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15
  },
  topName: {
    fontSize: 18,
    color: config.lightBlack,
    fontWeight: 'bold',
    marginBottom: 10
  },
  phone: {
    color: config.darkGray
  },
  set:{
    height:56,
    backgroundColor:'#fff',
    flexDirection:'row',
    alignItems:'center',
    paddingLeft: 10,
    justifyContent: 'space-between',
    borderBottomColor:config.lightGray,
    borderBottomWidth:0.5,
    alignItems:"center",
    paddingRight:10,
  },
  setRight:{
    flex:1,
    height:'100%',
    flexDirection:"row",
    justifyContent:'space-between',
    borderBottomColor:config.lightGray,
    borderBottomWidth:0.5,
    alignItems:"center",
    paddingRight:10,
    marginLeft: 10,
  },
  sendMessage: {
    backgroundColor: config.primaryColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: config.screenWidth - 40,
    alignSelf: 'center',
    color: config.whiteFont,
    borderRadius: 18,
    marginTop: 20,
    height:44
  }
})


import { connect } from 'react-redux'

import { addChatFriend, setChatTo } from '../actions/index'

const mapStateToProps = store => { 
  return {
    chatList:store.chatList
  }
}

const mapDispatchTOProps = dispatch => { 
  return {
    addChatFriend: payload => { 
      dispatch(addChatFriend(payload))
    },
    setChatTo: payload => {
      dispatch(setChatTo(payload));
    }
  }
}

export default connect(mapStateToProps, mapDispatchTOProps)(UserDetail);