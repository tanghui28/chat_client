import Storage from './storage';
import store from '../store/store'

export default class Utility { 

  // 一条存储聊天记录
  static storeAddRecord = async (from, to, obj) => {
    let chatRecord = await Storage.getData(from + 'chatRoom' + to);
    chatRecord = Array.isArray(chatRecord) ? chatRecord : [];
    // {
    //   text: '你好吗ffffff?',
    //   type: 0,
    //   time: 1568098926233
    // }
    chatRecord.push(obj);
    Storage.setData(from + 'chatRoom' + to, JSON.stringify(chatRecord));

  }

  // 多条存储聊天记录
  static storeAddRecordLarge = async (from,to,newRecordArr) => { 
    let chatRecord = await Storage.getData(from + 'chatRoom' + to);
    chatRecord = Array.isArray(chatRecord) ? chatRecord : [];
    chatRecord = [
      ...chatRecord,
      ...newRecordArr
    ];
    Storage.setData(from + 'chatRoom' + to, JSON.stringify(chatRecord));

  }


}