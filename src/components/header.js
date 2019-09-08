import React from 'react'
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'
import {
    Icon,
    Popover
  } from '@ant-design/react-native'
import config from '../config/config';


class Header extends React.Component{
  constructor(){
    super();
    this.state = {};
  }


  render(){

    return (
      <View style={[this.props.style,styles.container]}>
        {
          this.props.showBack ? (<Icon name="left"></Icon>) :null
        }
        
        <Text style={styles.title}>{this.props.title?this.props.title:''}</Text>
        <TouchableOpacity style={{flex:1,flexDirection:'row',justifyContent:"flex-end"}}>
          {
            this.props.showIcon?(
              <Popover 
                placement="bottom"
                overlay={
                  <View style={{backgroundColor:'#000'}}>
                    <Popover.Item style={styles.popItem}>
                      <Icon name="scan" color={config.primaryColor} size={26}></Icon>
                      <Text>111111</Text>
                    </Popover.Item>
                    <Popover.Item style={styles.popItem}>
                      <Icon name="scan" color={config.primaryColor} size={26}></Icon>
                      <Text>111111</Text>
                    </Popover.Item>
                  </View>
                }>
                <Icon color={config.lightBlack} name="plus-circle"></Icon>
                
              </Popover>
            
            
            ):null
          }
        </TouchableOpacity>
      </View>
    )

  }

}

Header.defaultProps= {
  title:'',
  showBack:false,
  showIcon:false,
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    height:50,
    paddingLeft:15,
    paddingRight:15,
    borderBottomWidth:0.5,
    borderBottomColor:config.defaultColor
  },
  title:{
    fontSize:config.fontSizeLarge,
    fontWeight:'bold'
  },
  popItem:{
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:'center',
    width:120
  }
})


export default Header;