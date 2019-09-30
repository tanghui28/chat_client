import { 
  ADD_CHAT_RECORD,
  DELETE_CHAT_RECORD,
  SET_CHAT_RECORD,
  ADD_CHAT_RECORD_TOP,
} from '../actions/type'

const initialState = [];

const chatRoom = (state = initialState, action) => {

  let { type, payload } = action;
  
  switch (type) {
    case ADD_CHAT_RECORD:
      return [
        ...state,
        payload
      ];
    
    
    case DELETE_CHAT_RECORD:
      
      return state.map((record, i) => {
        return i != payload;
      });
      
    
    
    case SET_CHAT_RECORD:

      return payload;
    
    case ADD_CHAT_RECORD_TOP:

      return [
        ...payload,
        ...state
      ]
    
    default: return state;
  
  }

}

export default chatRoom;