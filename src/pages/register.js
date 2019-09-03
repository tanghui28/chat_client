import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import config from '../config/config';


class Register extends React.Component { 
  constructor() { 
    super();
    this.state = {}
  }

  register = () => { 
    console.log(config.screenWidth)
  };


  render() { 
    return (
      <View style={[styles.viewContainer]}>
        < TextInput style={ styles.input } placeholder="用户名" />
        < TextInput style={ styles.input } placeholder="手机号" />
        < TextInput style={ styles.input } placeholder="密码" />
        <TouchableOpacity onPress={this.register} style={styles.regBtn}>
          <Text style={{color:config.whiteFont}}>注册</Text>
        </TouchableOpacity>
      </View>

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