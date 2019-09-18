import { combineReducers } from 'redux'


import friendList from './friendList'
import chatList from './chatList'
import chatRoom from './chatRoom'
import mine from './mine'


export default combineReducers({
  friendList,
  chatList,
  chatRoom,
  mine,
})
