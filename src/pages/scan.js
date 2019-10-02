import React from 'react'
import {
  View,
  ToastAndroid
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