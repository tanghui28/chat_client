import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from 'react-native'
import config from '../config/config'
import Header from '../components/header'


class ModifyRemark extends React.Component{
  constructor(){
    super();
    this.state = {

    }
  }

  back = () => {
    this.props.navigation.goBack();
  };

  render (){

    return (
      <View style={styles.container}>
        <Header backFun={this.back} showBack={true} title="设置备注"></Header>
        < TextInput style={styles.input} ></ TextInput>
        < TouchableOpacity style={styles.saveBtn} >
          <Text style={{color:config.whiteFont}}>保存</Text>
        </TouchableOpacity>
      </View>
    )

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.pageBgColor,
    alignItems:'center'
  },
  input: {
    backgroundColor: config.inputBackground,
    width:'100%'
  },
  saveBtn: {
    backgroundColor: config.btnPrimaryColor,
    height: 40,
    width: config.screenWidth - 40,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:20
  }
})

export default ModifyRemark;