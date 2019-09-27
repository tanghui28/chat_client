import Storage from './storage';
import store from '../store/store'

export default class Utility { 

  static storeChatList(chatList) { 

    Storage.setData('chatList', JSON.stringify(chatList));

  }


}