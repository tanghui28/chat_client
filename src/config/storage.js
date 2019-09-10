import AsyncStorage from '@react-native-community/async-storage';


export default class Storage{

  static async storeData(k,v,fun){

    try {
      await AsyncStorage.setItem(k,v);
      if(typeof fun == "function"){
        fun();
      }
    } catch (error) {
      
    }

  }

  static async getData(k,fun){
    try {
      let val = await  AsyncStorage.getItem(k);
      if(typeof fun == "function"){
        fun(val);
      }
      
    } catch (error) {
      
    }
  }

  static async removeData(k,fun){

    try {
      await AsyncStorage.removeItem(k);
      if(typeof fun == "function"){
        fun()
      }
    } catch (error) {
      
    }

  }


}