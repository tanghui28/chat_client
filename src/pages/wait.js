import React from 'react'
import {
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'

import Storage from '../config/storage'

import { NavigationActions,StackActions } from 'react-navigation'

class Wait extends React.Component{
  constructor(){
    super();
  }

  componentWillMount(){

    const toChoose = StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({routeName:'Choose'})//要跳转到的页面名字
        ]
    });
    const toMain = StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({routeName:'bottomTabNavigator'})//要跳转到的页面名字
        ]
    });

    Storage.getData('userInfo').then(res=>{

      if(res && res.token){
        Net('isLogin',{
          token:res.token
        }).then(data => {
          // console.log(res);
          // console.log(data);
          if (data.success) {
            this.getFriendList();
            this.props.setMine(data.data);
            this.props.navigation.dispatch(toMain);
          }else{

            this.props.navigation.dispatch(toChoose);
          }

        }).catch(err=>{
          console.log(err)
        })

      }else {
        this.props.navigation.dispatch(toChoose);
      }


    }).catch(err=>{

      this.props.navigation.dispatch(toChoose);
    })
  }

  // 从服务器获取好友列表
  getFriendList() { 
    Net('friendList', {}).then(res => { 
      if (res.success) { 
        console.log(res);
        this.props.setFriend(res.data);
      }
    })
  }

  render(){

    return (
      <ImageBackground style={styles.backgroud} source={require('../assets/img/bg.jpg')}>
        <ActivityIndicator size="large" color="#aaa"></ActivityIndicator>
      </ImageBackground>
    )

  }

}


const styles = StyleSheet.create({
  backgroud: {
    flex:1,
    justifyContent:'center'
  },

})

import {connect} from 'react-redux'
import { setMINE, setFriend} from '../actions/index'

const mapDispatchToProps = dispatch =>{
  return {

    setMine:payload=>{
      dispatch(setMINE(payload))
    },
    setFriend: payload => { 
      dispatch(setFriend(payload))
    }

  }
}

export default connect(null,mapDispatchToProps)(Wait);

