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

import config from '../config/config'

class Login extends React.Component { 

  constructor() { 
    super();
    this.state = {

    }
  }

  login = () => {

  };

  render() {
  
    return (
      <View style={[styles.viewContainer]}>
        <TextInput style={ styles.input } placeholder="用户名或手机号" />
        <TextInput style={ styles.input }  placeholder="密码" />
        <TouchableOpacity onPress={this.login} style={styles.regBtn}>
            <Text style={{color:config.whiteFont}}>登录</Text>
        </TouchableOpacity>
      </View>
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