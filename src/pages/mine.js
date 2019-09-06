import React from 'react'

import { 
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'


import {
  Provider,
  Toast
} from '@ant-design/react-native'

class Mine extends React.Component { 
  constructor() { 
    super();
    this.state = {}
  }


  render() { 

    return (
      < Provider >
        <View>
          <Text>我的</Text>
        </View>
      </ Provider>
    )

  }


}


export default Mine;