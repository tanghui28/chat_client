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
        // dispatch
        this.props.setFriend(res.data.friendList);
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
import {setMINE,setFriend} from '../actions/index'
import store from '../store/store';

const mapDispatchToProps = dispatch => { 
  return {
   login:payload=>{
    dispatch(setMINE(payload))
   },
   setFriend:payload=>{
     dispatch(setFriend(payload))
   }
  }
}




export default connect(null,mapDispatchToProps)(Login);