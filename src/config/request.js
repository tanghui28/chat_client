import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://192.168.1.5:3000',
  timeout: 3000,
  headers: {
    'Content-Type':'application/json'
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
    
    return Promise.reject(error);

})



export const Net = async (api,params) => { 

  return new Promise((resolve,reject) => { 

    instance.post(api, params).then(res => { 
      resolve(res.data);
    }).catch(err => { 
      reject(err);
    })

  })


}