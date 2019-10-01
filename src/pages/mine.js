import React from 'react'

import { 
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal
} from 'react-native'
import {
  Iconfont
} from '../../font/index'

import {
  Provider,
  Icon,
} from '@ant-design/react-native'
import QRCode from 'react-native-qrcode-svg';
import Storage from '../config/storage'
import { NavigationActions,StackActions } from 'react-navigation'
import config from '../config/config';

class Mine extends React.Component { 
  constructor() { 
    super();
    this.state = {
      modalVisible:false
    }
  }

  logout = ()=>{
    Storage.removeData('userInfo');
    Storage.removeData('chatList');
    this.props.logout();
    this.props.deleteChatList();
    global.ws.close();
    const toChoose = StackActions.reset({
      index: 0,
      actions: [
          NavigationActions.navigate({routeName:'Choose'})//要跳转到的页面名字
      ]
    });
    this.props.navigation.dispatch(toChoose);
  };  

  closeModal=()=>{
    this.setState({
      modalVisible:false
    })
  };

  componentDidMount(){
    console.log(this.props.userInfo)
  }
  render() { 

    return (

        <View style={styles.container}>
          <View style={styles.topInfo}>
            <Image style={styles.avatar} source={{uri:this.props.userInfo.avatar}}></Image>
            <View style={styles.rightInfo}>
              <Text style={styles.topName}>{this.props.userInfo.uname}</Text>
              <Text style={styles.phone}>手机号:{this.props.userInfo.phone}</Text>
            </View>
          </View>

          {/* 动态 */}
          <TouchableOpacity activeOpacity={0.6}>
          <View style={styles.dongtai}>
            <Iconfont color="#CC99FF" name="icon-zhifeiji" size={26}></Iconfont>
            <View style={styles.dongtaiRight}>
              <Text style={{fontSize:config.fontSizeTitle}}>动态</Text>
              <Icon size={18} name="right"></Icon>
            </View>
            
          </View>
          </TouchableOpacity>
          {/* 其他功能 */}
          <TouchableOpacity activeOpacity={0.6}>
          <View style={styles.set}>
            <Icon name="scan" color={config.primaryColor} size={26}></Icon>
            <View style={styles.setRight}>
              <Text style={{fontSize:config.fontSizeTitle}}>扫一扫</Text>
              <Icon size={18} name="right"></Icon>
            </View> 
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{this.setState({modalVisible:true})}} activeOpacity={0.6}>
          <View style={styles.set}>
            <Icon name="qrcode" color="#1E90FF" size={26}></Icon>
            <View style={styles.setRight}>
              <Text style={{fontSize:config.fontSizeTitle}}>二维码</Text>
              <Icon size={18} name="right"></Icon>
            </View> 
          </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.6}>
          <View style={styles.set}>
            <Icon name="alert" color="#CC6666" size={26}></Icon>
            <View style={styles.setRight}>
              <Text style={{fontSize:config.fontSizeTitle}}>关于</Text>
              <Icon size={18} name="right"></Icon>
            </View>
            
          </View>
          </TouchableOpacity>


          <TouchableOpacity onPress={this.logout} activeOpacity={0.6} style={styles.logout}>
            <Text style={{color:'#fff'}}>退出登录</Text>
          </TouchableOpacity>
          <Modal  
            onRequestClose={()=>{this.setState({modalVisible:false})}}
            transparent={true}
            visible={this.state.modalVisible}
            animationType="slide"
            animated={true}
          >
            <TouchableOpacity activeOpacity={0} onPress={this.closeModal} style={styles.modal}>
              <View style={styles.qr}>
                <QRCode 
                  onPress={()=>{console.log(22)}}
                  value={this.props.userInfo.user_id.toString()}
                  logo={this.props.userInfo.avatar}
                  logoSize={30}
                  size={200}
                />
              </View>
               
            </TouchableOpacity>
             
          </Modal>
        </View>

    )

  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:config.pageBgColor
  },
  topInfo:{
    height:140,
    paddingLeft:20,
    paddingRight:10,
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#fff'
  },
  avatar:{
    width: 60,
    height:60,
    borderRadius:6
  },
  rightInfo:{
    flex:1,
    paddingLeft:15,
    paddingRight:15
  },
  topName:{
    fontSize:18,
    color:config.lightBlack,
    fontWeight:'bold',
    marginBottom:10
  },
  phone:{
    color:config.darkGray
  },
  dongtai:{
    height:60,
    marginTop:10,
    marginBottom:10,
    backgroundColor:'#fff',
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:10,
    paddingRight:10
  },
  dongtaiRight:{
    flex:1,
    flexDirection:"row",
    justifyContent:'space-between',
    paddingLeft:10,
  },
  set:{
    height:56,
    backgroundColor:'#fff',
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:10,
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
    marginLeft:10
  },
  logout:{
    backgroundColor:config.dangerColor,
    alignItems:'center',
    justifyContent:'center',
    height:44,
    borderRadius:20,
    marginTop:20,
    width:config.screenWidth - 40,
    alignSelf:'center'
  },
  modal:{
    flex:1,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(0,0,0,0.5)'
  },
  qr:{
    width:220,
    height:220,
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10
  }
})


import {connect} from 'react-redux'
import { deleteMINE,setChatFriend } from '../actions/index'

const mapStateToProps =(store)=>{
  return {
    userInfo:store.mine
  }
}
const mapDispatchToProps = dispatch => { 
  return {
   logout:()=>{
    dispatch(deleteMINE())
   },
   deleteChatList:()=>{
     dispatch(setChatFriend([]))
   }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Mine);