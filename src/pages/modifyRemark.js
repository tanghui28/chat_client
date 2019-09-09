import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import config from '../config/config'


class ModifyRemark extends React.Component{
  constructor(){
    super();
    this.state = {

    }
  }

  render (){

    return (
      <View style={styles.container}></View>
    )

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.pageBgColor
  },
})

export default ModifyRemark;