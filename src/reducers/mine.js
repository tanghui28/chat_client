import { 
  SET_MINE
} from '../actions/type'

const initialState = {};

const mine = (state = initialState, action) => {

  let { type, payload } = action;
  
  switch (type) {
    case SET_MINE:
      return payload
    
    
    default: return state;
  
  }

}

export default mine;