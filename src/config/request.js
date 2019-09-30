import axios from 'axios'
import Storage from './storage'
import { ToastAndroid} from 'react-native'

const instance = axios.create({
  baseURL: 'http://192.168.1.21:3000',
  timeout: 5000,
  headers: {
    'Content-Type':'application/json',
  }
})


// 请求拦截器
instance.interceptors.request.use( async(config) =>{

  let token = null;
  await Storage.getData('userInfo').then(res => { 
    if (res && res.token) { 
      token = res.token;
    }
  }).catch(err=>{
    
  })
  config.headers.token = token;
  return config;
},  (error)=> {

    return Promise.reject(error);
});

// 响应拦截处理
instance.interceptors.response.use( (response)=> {

  return response;

}, (error) => { 
    console.log(error);
    if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
      ToastAndroid.show('网络超时', ToastAndroid.SHORT);
      return Promise.reject(error);   
    }
    
    return Promise.reject(error);

})



export const Net = async (api,params,config) => { 

  return new Promise((resolve,reject) => { 

    instance.post(api, params,config).then(res => { 
      resolve(res.data);
    }).catch(err => { 
      reject(err);
    })

  })


}