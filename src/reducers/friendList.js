import { 
  ADD_FRIEND,
  DELETE_FRIEND,
  SET_FRIEND
} from '../actions/type'

const friendList = (state=[],action) => { 

  let { type, payload } = action;
  
  switch (type) {
    case ADD_FRIEND:
      return [
        ...state, 
        payload
      ]
    break;
    
    
    case DELETE_FRIEND:
      
      return state.map((friend,i) => { 
        return friend.uid != payload.uid;
      })
      
    break;
    
    
    case SET_FRIEND:

      return payload
      
    break;
  
  }

}

export default friendList;