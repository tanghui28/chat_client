import {
  ADD_FRIEND,
  DELETE_FRIEND,
  SET_FRIEND,
  ADD_CHAT_FRIEND,
  DELETE_CHAT_FRIEND,
  SET_CHAT_FRIEND,
  ADD_CHAT_RECORD,
  DELETE_CHAT_RECORD,
  SET_CHAT_RECORD,
  MODIFY_CHAT_FRIEND,
  SET_MINE,
  DELETE_MINE,
  SET_TALK_TO,
  ADD_CHAT_RECORD_TOP
} from './type'

/**
 * 
 * friendList
 */
export const addFriend = payload => {
  
  return {
    type: ADD_FRIEND,
    payload
  }
  
};

export const deleteFriend = payload => ({
  type: DELETE_FRIEND,
  payload
});

export const setFriend = payload => ({
  type: SET_FRIEND,
  payload
});


/**
 * 
 * chatList
 */
export const addChatFriend = payload => ({
  type: ADD_CHAT_FRIEND,
  payload
});
export const deleteChatFriend = payload => ({
  type: DELETE_CHAT_FRIEND,
  payload
});
export const setChatFriend = payload => ({
  type: SET_CHAT_FRIEND,
  payload
});
export const modifyChatFriend = payload => ({
  type: MODIFY_CHAT_FRIEND,
  payload

})


/**
 * chatRoom
 */
export const addChatRecord = payload => ({
  type: ADD_CHAT_RECORD,
  payload
});
export const deleteChatRecord = payload => ({
  type: DELETE_CHAT_RECORD,
  payload
});
export const setChatRecord = payload => ({
  type: SET_CHAT_RECORD,
  payload
});
export const addChatRecordTop = payload => ({
  type: ADD_CHAT_RECORD_TOP,
  payload
})


/**
 * 
 * 设置当前聊天对象
 */
export const setChatTo = payload => ({ 
  type: SET_TALK_TO,
  payload
})



/**
 * 设置登陆用户信息
 */
export const setMINE = payload => ({
  type: SET_MINE,
  payload
});
export const deleteMINE = () => ({
  type: SET_MINE,
  payload:null
});

