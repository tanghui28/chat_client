import {
  SET_TALK_TO,
} from '../actions/type'
const initialState = {};

const talkUserInfo = (state = initialState, action) => { 
  
  let { type, payload } = action;
  switch (type) {
    case SET_TALK_TO:
      return payload
      
  
    default: return state;
  }

}


export default talkUserInfo;