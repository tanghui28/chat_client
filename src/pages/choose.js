import React, {
  Fragment
} from 'react';

import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

import config from '../config/config'

class Choose extends React.Component { 
  constructor() { 
    super();
    this.state = {}
  }

  toLogin = () => {

    console.log(this)
    this.props.navigation.navigate('Login')

  }

  toRegister = () => { 
    this.props.navigation.navigate('Register')
  }

  render() {
    return (
      <ImageBackground style={styles.backgroud} source={require('../assets/img/bg.jpg')}>
        <View style={[styles.viewContainer]}>
          <View style={[styles.bottomView]}>
            <TouchableOpacity onPress={this.toRegister}  style={[styles.leftBtn]}>
              <Text style={styles.btnText}>注册</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toLogin} style={styles.rightBtn}>
              <Text style={styles.btnText}>登录</Text>
            </TouchableOpacity>
          </View>
    
        </View>

      </ImageBackground>
      
    )
  }

}

const styles = StyleSheet.create({
  backgroud: {
    flex:1
  },
  viewContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  bottomView: {
    flexDirection: "row",
    justifyContent: 'space-around',
    paddingBottom:60
  },
  leftBtn: {
    width: 100,
    height: 40,
    backgroundColor: '#1D83A2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    color: '#fff'
  },
  rightBtn: {
    width: 100,
    height: 40,
    backgroundColor: config.btnPrimaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18
  },
  btnText: {
    color:'#fff'
  }
})

export default Choose;