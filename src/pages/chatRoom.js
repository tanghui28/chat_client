import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Image
} from 'react-native'
import config from '../config/config'
import Header from '../components/header'
import { Config } from '@jest/types';

class ChatRoom extends React.Component { 
  constructor() { 
    super();
    this.state = {

      userInfo: {
        uid: 1,
        uname: "A小王",
        avatar: 'male.png',
        phone: '18161046533'
      },
      //type 0对方     1自己
      messages: [
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
      ]

    };
  }


  back = () => {
    this.props.navigation.goBack();
  };

  render() { 
    return (
      <View style={styles.container}>
        <Header backFun={this.back} title={this.state.userInfo.uname} showBack={true} showBack={true}></Header>
        < FlatList
          data={this.state.messages}
          keyExtractor={
            ({ index}) => { 
              return index
            }
          }
          renderItem={
            ({ item, index }) => { 
              return (
                <View style={ item.type == 0 ? styles.leftView :styles.rightView }>
                  < Image style={styles.avatar} source={require('../assets/img/male.png')} ></ Image>
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
          <TextInput multiline={true} style={styles.input}></TextInput>
          <TouchableOpacity style={styles.sendBtn}>
            <Text style={{color:config.whiteFont}}>发送</Text>
          </TouchableOpacity>
        </View>



      </View>
    )
   

  }

}


ChatRoom.defaultProps = {

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
    position:'relative'
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
    width: config.screenWidth - 40,
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignSelf: 'flex-end',
    alignItems: 'center',
    padding: 10
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
    marginRight: 15
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
    backgroundColor: config.whiteFont,
    transform: [{
      rotate: '45deg'
    }]
  },
  

})


export default ChatRoom;