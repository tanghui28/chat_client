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

  goBack = () => { 

    if (this.props.backFun) { 
      this.props.backFun();
    }
    
  };

  render(){

    return (
      <View style={[this.props.style,styles.container]}>
        {
          this.props.showBack ? (<TouchableOpacity onPress={this.goBack} activeOpacity={0.6}><Icon style={styles.back}  name="left"></Icon></TouchableOpacity>) :null
        }
        
        <Text style={styles.title}>{this.props.title?this.props.title:''}</Text>
        <TouchableOpacity style={{flex:1,flexDirection:'row',justifyContent:"flex-end"}}>
          {
            this.props.showIcon?(
              <Popover 
                placement="bottom" 
                overlay={
                  <View style={ styles.popContainer }>
                    <Popover.Item style={styles.popItem}>
                      <Icon style={styles.popIcon} name="scan" color={config.whiteFont} size={26}></Icon>
                      <Text style={styles.popText}>扫一扫</Text>
                    </Popover.Item>
                    <Popover.Item style={styles.popItem}>
                      <Icon style={styles.popIcon} name="user-add" color={config.whiteFont} size={26}></Icon>
                      <Text style={styles.popText}>添加朋友</Text>
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
  showIcon: false,
  backFun:null
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
  back: {
    padding: 10,
    paddingLeft:0
  },
  title:{
    fontSize:config.fontSizeLarge,
    fontWeight:'bold'
  },
  popContainer:{
    backgroundColor: "#434343",
    borderRadius: 4,
    paddingTop: 10,
    paddingBottom:10
  },
  popItem:{
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:'center',
    width: 120,
    height:50
  },
  popIcon: {
    marginRight:10
  },
  popText: {
    flex: 1,
    height:'100%',
    textAlign: 'left',
    paddingTop:4,
    color: config.whiteFont,
    borderBottomWidth: 0.5,
    borderColor: config.darkGray,
    alignItems: 'center',
  }
})


export default Header;