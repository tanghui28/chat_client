import React, {
  Fragment
} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

import { NavigationActions,StackActions } from 'react-navigation'

import config from '../config/config'

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

export default Login;