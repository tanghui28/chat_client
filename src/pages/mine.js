import React from 'react'

import { 
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  
} from 'react-native'
import {
  Iconfont
} from '../../font/index'

import {
  Provider,
  Toast,
  Icon,
  List 
} from '@ant-design/react-native'
import config from '../config/config';

class Mine extends React.Component { 
  constructor() { 
    super();
  }


  render() { 

    return (
      < Provider >
        <View style={styles.container}>
          <View style={styles.topInfo}>
            <Image style={styles.avatar} source={require('../assets/img/20.jpeg')}></Image>
            <View style={styles.rightInfo}>
              <Text style={styles.topName}>尼古拉斯赵四</Text>
              <Text style={styles.phone}>手机号:18161046533</Text>
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

          <TouchableOpacity activeOpacity={0.6}>
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

        </View>
      </ Provider>
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
  }
})


export default Mine;