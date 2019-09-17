import AsyncStorage from '@react-native-community/async-storage';


export default class Storage{

  static async setData(k,v,fun){

    try {
      await AsyncStorage.setItem(k,v);
      if(typeof fun == "function"){
        fun();
      }
    } catch (error) {
      console.log(error)
    }

  }

  static async getData(k){
    try {
      let val = await  AsyncStorage.getItem(k);
      return val;
      
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