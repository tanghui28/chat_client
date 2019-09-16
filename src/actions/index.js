import {
  ADD_FRIEND,
  DELETE_FRIEND,
  SET_FRIEND
} from './type'

 
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



