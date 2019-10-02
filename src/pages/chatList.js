import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
  FlatList,
  BackHandler,
  Platform,
  ToastAndroid
} from 'react-native';


import {
  Iconfont
} from '../../font/index'

import config from '../config/config'

import Header from '../components/header'


class ChatList extends React.Component { 
  constructor() { 
    super();
    this.state = {

    };
    this.thisBackPressed = null;
    this.lastBackPressed = null;
  }

  componentWillMount() { 

  }

  componentDidMount() { 

    if (Platform.OS === 'android') {

        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);

    }
  }
  componentWillUnmount(){
    if (Platform.OS === 'android') {

      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);

   }
  }

  onBackAndroid = () => {

    // const routers = this.props.navigation.state;

    if (this.props.navigation.isFocused()) {
      let time = new Date();

      this.lastBackPressed = this.thisBackPressed;

      this.thisBackPressed = time.getTime();

      if (this.lastBackPressed && this.lastBackPressed + 2000 >= this.thisBackPressed) {

          //最近2秒内按过back键，可以退出应用。
        global.ws.close();
        return false;

      }

      ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);

      return true;
    }
  
  }

  toChatRoom = (user_id,remark,avatar) => { 
    this.props.setChatTo({
      user_id,
      remark,
      avatar
    })
    this.props.navigation.navigate('ChatRoom',user_id);
  };

  formatReplyTime(time) { 
    if ( !time ) { 
      return "";
    }
    let now = new Date();
    let nowDetail = {
      nowYear: now.getFullYear(),
      nowMonth: now.getMonth() + 1,
      nowDay: now.getDate()
    }

    let target = new Date(time);
    let targetDetail = {
      targetYear: target.getFullYear(),
      targetMonth: target.getMonth() + 1,
      targetDay: target.getDate(),
      targetHours: target.getHours(),
      targetMinutes:target.getMinutes()
    }

    if (  //今天
      nowDetail.nowYear == targetDetail.targetYear &&
      nowDetail.nowMonth == targetDetail.targetMonth &&
      nowDetail.nowDay == targetDetail.targetDay
    ) {

      let label = (targetDetail.targetHours >= 0 && targetDetail.targetHours < 6) ? '凌晨' : (
        (targetDetail.targetHours >= 6 && targetDetail.targetHours < 9) ? '早上' : (
          (targetDetail.targetHours >= 9 && targetDetail.targetHours < 12) ? '上午' : (
            (targetDetail.targetHours >= 12 && targetDetail.targetHours < 19) ? '下午' : (
              (targetDetail.targetHours >= 19 && targetDetail.targetHours < 24) ? '晚上' : ''
            )
          )
        )
      );
      targetDetail.targetMinutes = targetDetail.targetMinutes <= 9 ? '0' + targetDetail.targetMinutes : targetDetail.targetMinutes;
      targetDetail.targetHours = targetDetail.targetHours > 12 ? targetDetail.targetHours - 12 : targetDetail.targetHours;
      return label + targetDetail.targetHours + ':' + targetDetail.targetMinutes;
      
    } else { 
      return targetDetail.targetMonth + '月' + targetDetail.targetDay +'日'

    }

  }

  toScan=()=>{
    this.props.navigation.navigate('Scan');
  }

  render() { 


    return (
      < View style={{paddingBottom:50}} >
        <Header scanFun={this.toScan} style={{backgroundColor:config.lightGray}} showIcon={true} title="消息"></Header>

        <FlatList
            initialNumToRender={10}
            data={this.props.list}
            keyExtractor = {
              (item,index) => String(index)
            }
            renderItem={({ item, index }) => { 
              return (
    
                <TouchableOpacity onPress={() => { this.toChatRoom(item.user_id, item.remark, item.avatar) }} activeOpacity={0.85} >
                  <View style={styles.item} >
                    <View style={styles.avatarview}>
                      < Image style={styles.avatar} source={{ uri: item.avatar }}></ Image>
                      {
                        item.unread > 0 ? (<Text style={styles.unreadCount}>{item.unread}</Text>) :null
                      }
                    </View>
                      
                    <View style={styles.itemRight}>
                      <View style={styles.title} >
                        <Text numberOfLines={1} ellipsizeMode="tail">{item.remark}</Text>
                        <Text style={styles.replyTime}>{this.formatReplyTime(item.replyTime) }</Text>
                      </View>
                      <Text style={styles.lastMsg} numberOfLines={1} ellipsizeMode="tail">{item.lastMsg}</Text>
                    </View> 
                  </View>
                </TouchableOpacity>
            
              )
            }}
            ListEmptyComponent={
              () =>{
                return (<Text style={styles.noItem}>没有新的消息!</Text>)
              }
            }
          ></FlatList>

      </ View>
    )

  }
}



const styles = StyleSheet.create({
  avatarview: {
    width: 50,
    height: 50,
    position:'relative'
  },
  unreadCount: {
    position: 'absolute',
    top: -6,
    right: -6,
    borderRadius: 8,
    backgroundColor: config.dangerColor,
    color: '#fff',
    width: 16,
    height: 16,
    lineHeight:16,
    textAlign:'center',
  },
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
    color: config.darkGray,
    fontSize:config.fontSizeSmaller
  },
  lastMsg: {
    paddingRight: 24,
    color:config.darkGray
  },
  noItem:{
    fontSize:config.fontSizeLarge,
    marginTop:20,
    alignSelf:'center'
  }

})


//引入connect函数
import { connect } from 'react-redux'
import { addChatFriend, deleteChatFriend, setChatTo } from '../actions/index'

const mapStateToProps = store=>{
  return {
    list:store.chatList,
    alignSelf:'center'
  }
}

const mapDispatchToProps = dispatch => { 
  return {
    addChatFriend: payload => {
      dispatch(addChatFriend(payload));
    },
    deleteChatFriend:payload=>{
      dispatch(deleteChatFriend(payload));
    },
    setChatTo: payload => { 
      dispatch(setChatTo(payload));
    }
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(ChatList)