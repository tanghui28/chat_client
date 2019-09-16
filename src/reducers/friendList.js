import { 
  ADD_FRIEND,
  DELETE_FRIEND,
  SET_FRIEND
} from '../actions/type'

const initialState = [
  {
    title: 'A',
    data: [{
        uid: 1,
        uname: "A小王",
        avatar: 'male.png',
        phone: '18161046533'
      },
      {
        uid: 2,
        uname: "A小唐",
        avatar: 'male.png',
        phone: '18161046533'
      },
      {
        uid: 2,
        uname: "A小唐",
        avatar: 'male.png',
        phone: '18161046533'
      },
      {
        uid: 2,
        uname: "A小唐",
        avatar: 'male.png',
        phone: '18161046533'
      },
    ]
  },
  {
    title: 'B',
    data: [{
        uid: 3,
        uname: "B小李",
        avatar: 'male.png',
        phone: '18161046533'
      },
      {
        uid: 4,
        uname: "B小李",
        avatar: 'male.png',
        phone: '18161046533'
      },
      {
        uid: 4,
        uname: "B小李",
        avatar: 'male.png',
        phone: '18161046533'
      },
      {
        uid: 4,
        uname: "B小李",
        avatar: 'male.png',
        phone: '18161046533'
      },
    ]
  },
  {
    title: "C",
    data: [{
        uid: 5,
        uname: "成龙",
        avatar: 'male.png',
        phone: '18161046533'
      },
      {
        uid: 6,
        uname: "成龙",
        avatar: 'male.png',
        phone: '18161046533'
      },
      {
        uid: 6,
        uname: "车龙",
        avatar: 'male.png',
        phone: '18161046533'
      },
    ]
  },
  {
    title: "D",
    data: [{
        uid: 5,
        uname: "大龙",
        avatar: 'male.png'
      },
      {
        uid: 6,
        uname: "大龙",
        avatar: 'male.png'
      },
      {
        uid: 6,
        uname: "大龙",
        avatar: 'male.png'
      },
      {
        uid: 6,
        uname: "大龙",
        avatar: 'male.png'
      },
      {
        uid: 6,
        uname: "大龙",
        avatar: 'male.png'
      },
      {
        uid: 6,
        uname: "大龙",
        avatar: 'male.png'
      },
      {
        uid: 6,
        uname: "大龙",
        avatar: 'male.png'
      },
      {
        uid: 6,
        uname: "大龙",
        avatar: 'male.png'
      },
      {
        uid: 6,
        uname: "大龙",
        avatar: 'male.png'
      },

    ]
  },
]

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
        return friend.uid != payload.uid;
      });
      
    
    
    case SET_FRIEND:

      return payload;
    
    default: return state;
  
  }

}

export default friendList;