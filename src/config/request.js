import axios from 'axios'
import Storage from './storage'
 Storage.getData('userInfo');

const instance = axios.create({
  baseURL: 'http://192.168.1.5:3000',
  timeout: 3000,
  headers: {
    'Content-Type':'application/json',
    'token':Storage.getData('userInfo').then(res=>{
      return res;
    })
  }
})


// 请求拦截器
instance.interceptors.request.use( (config) =>{

  return config;
},  (error)=> {

    return Promise.reject(error);
});

// 响应拦截处理
instance.interceptors.response.use( (response)=> {

  return response;

}, (error) => { 

    if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
      console.log("网络超时", error);
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