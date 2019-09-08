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

import {
  Provider,
  Toast
} from '@ant-design/react-native'

import config from '../config/config'

import Header from '../components/header'

class FriendsList extends React.Component { 
  constructor() { 
    super();
    this.state = {
      list:[
        {
          title:'A',
          data:[
            {
              uid:1,
              uname: "A小王",
              avatar:'male.png'
            },
            {
              uid:2,
              uname: "A小唐",
              avatar:'male.png'
            },
          ]
        },
        {
          title:'B',
          data:[
            {
              uid: 3,
              uname: "B小李",
              avatar: 'male.png'
            },
            {
              uid: 4,
              uname: "B小李",
              avatar: 'male.png'
            },
          ]
        },
        {
          title:"C",
          data:[
            {
              uid: 5,
              uname: "陈龙",
              avatar: 'male.png'
            },
            {
              uid: 6,
              uname: "成龙",
              avatar: 'male.png'
            },
            {
              uid: 6,
              uname: "成龙",
              avatar: 'male.png'
            },
            {
              uid: 6,
              uname: "成龙",
              avatar: 'male.png'
            },
            {
              uid: 6,
              uname: "成龙",
              avatar: 'male.png'
            },
            {
              uid: 6,
              uname: "成龙",
              avatar: 'male.png'
            },
            {
              uid: 6,
              uname: "成龙",
              avatar: 'male.png'
            },
            {
              uid: 6,
              uname: "成龙",
              avatar: 'male.png'
            },
            {
              uid: 6,
              uname: "成龙",
              avatar: 'male.png'
            },
            {
              uid: 6,
              uname: "成龙",
              avatar: 'male.png'
            },
            {
              uid: 6,
              uname: "成龙",
              avatar: 'male.png'
            },
          ]
        }
      ]
    };
  }

  render() { 

    return (
      < Provider >
        <View style={styles.container}>
        <Header style={{backgroundColor:config.lightGray}} showIcon={true} title="通讯录"></Header>
          <SectionList sections={this.state.list} 
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
                  <TouchableOpacity TouchableOpacity={0.6}>
                  <View style={styles.item} >
                    <Image style={styles.avatar} source={require('../assets/img/20.jpeg')}></Image>
                    <View style={styles.uname}>
                      <Text numberOfLines={1} ellipsizeMode="tail">{item.uname}</Text>
                    </View>

                    
                  </View>
                  </TouchableOpacity>
                )
              }
            }
          ></SectionList>

          {/* 右侧A-Z */}
          <View style={styles.rightBar}>
            <Text style={styles.rightBarText}>A</Text>
            <Text style={styles.rightBarText}>B</Text>
            <Text style={styles.rightBarText}>C</Text>
            <Text style={styles.rightBarText}>D</Text>
            <Text style={styles.rightBarText}>E</Text>
            <Text style={styles.rightBarText}>F</Text>
            <Text style={styles.rightBarText}>G</Text>
            <Text style={styles.rightBarText}>H</Text>
            <Text style={styles.rightBarText}>I</Text>
            <Text style={styles.rightBarText}>J</Text>
            <Text style={styles.rightBarText}>K</Text>
            <Text style={styles.rightBarText}>L</Text>
            <Text style={styles.rightBarText}>M</Text>
            <Text style={styles.rightBarText}>N</Text>
            <Text style={styles.rightBarText}>O</Text>
            <Text style={styles.rightBarText}>P</Text>
            <Text style={styles.rightBarText}>Q</Text>
            <Text style={styles.rightBarText}>R</Text>
            <Text style={styles.rightBarText}>S</Text>
            <Text style={styles.rightBarText}>T</Text>
            <Text style={styles.rightBarText}>U</Text>
            <Text style={styles.rightBarText}>V</Text>
            <Text style={styles.rightBarText}>W</Text>
            <Text style={styles.rightBarText}>X</Text>
            <Text style={styles.rightBarText}>Y</Text>
            <Text style={styles.rightBarText}>Z</Text>
          </View>

        </View>
      </ Provider>
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
    width: 50,
    height:50,
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
    paddingRight:6,
    paddingTop:3,
    paddingBottom:3
  }
})

export default FriendsList;