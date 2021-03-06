import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  SectionList,
  Image
} from 'react-native';

import config from '../config/config'
import Header from '../components/header'

//引入connect函数
import { connect } from 'react-redux'

// actions
import {
  setFriend,
  deleteFriend
} from '../actions/index'

class FriendsList extends React.Component { 
  constructor() { 
    super();
    this.sectionList = React.createRef();
    this.state = {
      alp: [
        'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
      ],
    };
  }
  componentDidMount() { 
    
  }

  scroll = (item) => { 

    let itemIndex = null;
    this.props.list.forEach((val,index) => {

      if ( val.title === item ) { 
        itemIndex = index;
      }

    })
    if (itemIndex === null) { 
      return;
    }

    this.sectionList.current.scrollToLocation({
      animated: true,
      itemIndex: 0,              //滚动到section中的第几个item
      sectionIndex: itemIndex,   //滚动到sectionlist 中的低结构section
      // viewOffset:50
    })
  };

  toDetail = (item) => {
    this.props.navigation.navigate('UserDetail',item)
  };

  toScan=()=>{
    this.props.navigation.navigate('Scan');
  }

  render() { 
    return (
        <View style={styles.container}>
          <Header scanFun={this.toScan} style={{ backgroundColor: config.lightGray }} showIcon={true} title="通讯录"></Header>
          < SectionList ref={this.sectionList}
            stickySectionHeadersEnabled = {
              true
            }
            initialNumToRender = {
              12
            }
            sections = {
              this.props.list
            }
            renderSectionHeader={
              ({section})=>{
                return (
                  <Text style={styles.groupTitle}>{section.title}</Text>
                )
              }
            } 
            keyExtractor={(item, index) => index}
            renderItem={
              ({item,index,section})=>{
                return (
                  <TouchableOpacity onPress={() => {  this.toDetail(item) } } TouchableOpacity={0.9}>
                    <View style={styles.item} >
                      <Image style={styles.avatar} source={{uri:item.avatar}}></Image>
                      <View style={styles.uname}>
                        <Text numberOfLines={1} ellipsizeMode="tail">{item.friend_remark}</Text>
                      </View>
  
                    </View>
                  </TouchableOpacity>
                )
              }
            }
            ListEmptyComponent={
              () =>{
                return (<Text style={styles.noItem}>快去添加好友吧!</Text>)
              }
            }
          ></SectionList>

          {/* 右侧A-Z */}
          <View style={styles.rightBar}>
            {
              this.state.alp.map((item,index) => { 
                return (
                  <Text onPress={() => { this.scroll(item)} } key={index} style={styles.rightBarText}>{item}</Text>
                )
              })
            }
          </View>

        </View>

    )

  }

}


const styles = StyleSheet.create({
  container:{
    flex:1,
    position:'relative'
  },
  groupTitle:{
    backgroundColor:config.lightGray,
    height:30,
    lineHeight:30,
    paddingLeft:10,
    color:config.darkGray,

  },
  avatar:{
    width: 40,
    height:40,
    borderRadius:6
  },
  item: {
    height: 60,
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:10,
    paddingRight:10
  },
  uname:{
    paddingLeft:10,
    borderBottomColor:config.lightGray,
    borderBottomWidth:0.5,
    height:'100%',
    flex:1,
    justifyContent:'center'
  },
  rightBar:{
    position:'absolute',
    right:0,
    top:0,
    height:'100%',
    justifyContent:'center',
    
  },
  rightBarText:{
    fontSize:10,
    paddingRight: 6,
    paddingLeft:6,
    paddingTop:3,
    paddingBottom:3
  },
  noItem:{
    fontSize:config.fontSizeLarge,
    marginTop:20,
    alignSelf:'center'
  }
})


const mapStateToProps = store => {
  return {
    list: store.friendList,
  }
}

const mapDispatchToProps = dispatch => { 
  return {
    set: payload => {
      dispatch(setFriend(payload))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList)