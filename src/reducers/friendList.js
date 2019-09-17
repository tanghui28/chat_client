import { 
  ADD_FRIEND,
  DELETE_FRIEND,
  SET_FRIEND
} from '../actions/type'

const initialState = [];

const friendList = (state = initialState, action) => {

  let { type, payload } = action;
  
  switch (type) {
    case ADD_FRIEND:
      return [
        ...state,
        payload
      ];
    
    
    case DELETE_FRIEND:
      
      return state.map((friend, i) => {
        return friend.user_id != payload;
      });
      
    
    
    case SET_FRIEND:

      return payload;
    
    default: return state;
  
  }

}

export default friendList;