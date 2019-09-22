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
    console.log(111)
    Storage.getData('userInfo').then(res=>{
      console.log(res)
      if(res && res.token){
        console.log(res)
        Net('isLogin',{
          token:res.token
        }).then(data=>{
          console.log(data);
          if(data.success){
            this.props.setMine(res);
            console.log('已登录');
            this.props.navigation.dispatch(toMain);
          }else{
            console.log('未登录');
            this.props.navigation.dispatch(toChoose);
          }

        }).catch(err=>{
          console.log(err)
        })

      }else {
        this.props.navigation.dispatch(toChoose);
      }


    }).catch(err=>{
      console.log(err);
      this.props.navigation.dispatch(toChoose);
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
import {setMINE} from '../actions/index'

const mapDispatchToProps = dispatch =>{
  return {

    setMine:payload=>{
      dispatch(setMINE(payload))
    }

  }
}

export default connect(null,mapDispatchToProps)(Wait);

