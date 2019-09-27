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
      Storage.setData(JSON.stringify(newState));
      return newState;
    
    
    case DELETE_CHAT_FRIEND:
      
      return state.map((friend, i) => {
        return friend.user_id != payload;
      });
      
    
    
    case SET_CHAT_FRIEND:

      return payload;
    
    case MODIFY_CHAT_FRIEND:
      let data = [...state];
      data[payload.index] = payload.detail;
      return data;
    
    default: return state;
  
  }

}

export default chatList;