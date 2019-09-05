import React from 'react'

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import config from '../config/config';


import {
   Provider,
   Toast
} from '@ant-design/react-native'




class Register extends React.Component { 
  constructor() { 
    super();
    this.state = {
      uname: '',
      phone:'',
      password:'',
    }
  }

  unameChange = (uname) => {
    this.setState({ uname });
  };
  phoneChange = (phone) => {
    this.setState({ phone });
  };
  passwordChange = (password) => {
    this.setState({ password });
  };

  register = () => { 
    
    Net('/register', {
      uname: this.state.uname,
      phone: this.state.phone,
      password:this.state.password
    }).then(res => { 

      if (res.success) {
        this.props.navigation.navigate('Login')
      } else { 

        Toast.fail(res.info)

      }
    }).catch(err => { 

    })

  };


  render() { 
    return (
      <Provider >
        <View style={[styles.viewContainer]}>
          < TextInput onChangeText={this.unameChange} value={this.state.uname} style={ styles.input } placeholder="用户名" />
          < TextInput onChangeText={this.phoneChange} value={this.state.phone} style={ styles.input } placeholder="手机号" />
          < TextInput onChangeText={this.passwordChange} value={this.state.password} style={ styles.input } placeholder="密码" />
        
            <TouchableOpacity onPress={this.register} style={styles.regBtn}>
            <Text style={{color:config.whiteFont}}>注册</Text>
          </TouchableOpacity>
        </View>
      </Provider>

    )
  }
}


const styles = StyleSheet.create({

  viewContainer: {
    paddingTop:80,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems:'center'
    
  },
  input: {
    borderBottomWidth: 1,
    borderColor: config.darkGray,
    borderStyle: 'solid',
    width:config.screenWidth - 40
  },
  regBtn: {
    backgroundColor: config.btnPrimaryColor,
    height:40,
    width: config.screenWidth - 40,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:40
  }

})

export default Register;