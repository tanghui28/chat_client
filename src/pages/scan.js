import React from 'react'
import {
  View,
  ToastAndroid,
  PermissionsAndroid,
} from 'react-native'

import Barcode from 'react-native-smart-barcode'
import Header from '../components/header'


class Scan extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      timer:null
    }
  }
  async requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: '申请摄像头权限',
          message:'老子要调用摄像头',
          buttonNeutral: '等会再问我',
          buttonNegative: '不行',
          buttonPositive: '好吧',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('现在你获得摄像头权限了');
      } else {
        ToastAndroid.show('无法获得摄像头权限,扫码功能无法使用');
        // console.log('用户并不屌你');
      }
    } catch (err) {
      // console.warn(err);
    }
  }
  componentDidMount(){
    this.requestCameraPermission();
  }
  componentWillUnmount(){
    this.state.timer && clearTimeout(this.state.timer)
  }
  _onBarCodeRead=(e)=>{
    if(e.nativeEvent.data.code.startsWith('friend')){
      ToastAndroid.show('已添加对方为好友',ToastAndroid.LONG);
      this._stopScan();
      // 添加对方为好友
      global.ws.send('updateFriend'+e.nativeEvent.data.code.slice(6));


      this.props.navigation.goBack();
    }else{
      ToastAndroid.show(e.nativeEvent.data.code,ToastAndroid.LONG);

      this.setState({
        timer :setTimeout(()=>{
          this._barCode.startScan();
        },3000)
      })
    }
    
  };
  _startScan = (e) => {
    this._barCode.startScan()
  };

  _stopScan = (e) => {
    this._barCode.stopScan()
  }

  back=()=>{
    this.props.navigation.goBack();
  }

  render(){
    return(
      <View style={{flex:1}}>
        <Header backFun={this.back} showBack={true} title="二维码/条形码"></Header>
        <Barcode 
          onBarCodeRead={this._onBarCodeRead}
          style={{flex:1}} 
          ref={component=>{this._barCode = component}}
        />  
      </View>
    )
  }

}


export default Scan;