import { 
  ADD_CHAT_FRIEND,
  DELETE_CHAT_FRIEND,
  SET_CHAT_FRIEND,
  MODIFY_CHAT_FRIEND,
} from '../actions/type'

import Storage from '../config/storage'
const initialState = [];

const chatList = (state = initialState, action) => {

  let { type, payload } = action;
  
  switch (type) {
    case ADD_CHAT_FRIEND:
      let newState = [
        payload,
        ...state
      ]
      Storage.setData('chatList',JSON.stringify(newState));
      return newState;
    
    
    case DELETE_CHAT_FRIEND:
      
      let newState2 = state.map((friend, i) => {
        return friend.user_id != payload;
      });
      Storage.setData('chatList',JSON.stringify(newState2));
      return newState2;
      
      
    
    
    case SET_CHAT_FRIEND:

      return payload;
    
    case MODIFY_CHAT_FRIEND:
      let newState3 = [...state];
      newState3[payload.index] = payload.detail;
      Storage.setData('chatList',JSON.stringify(newState3));
      return newState3;
    
    default: return state;
  
  }

}

export default chatList;