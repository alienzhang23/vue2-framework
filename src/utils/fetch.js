import axios from 'axios';
import {Message} from 'element-ui';
import router from '../router'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
  config.headers = {
    'Content-Type': 'application/json',
    // 'areaId': AREAID,
    'Authorization': window.localStorage.getItem('token') || ''
  };
  // config.headers['appId'] = APPID;
  // config.headers['secret'] = SECRET;
  if (config.method == 'get') {
    config.params = config.params || {};
    // config.params.areaId = config.params.areaId || AREAID;
  } else {
    config.data = config.data || {};
    // config.data.areaId = config.data.areaId || AREAID;
  }
  return config
}, error => {
  Promise.reject(error)
});

// respone拦截器
service.interceptors.response.use(
  response => {
    var xhr = response, code = xhr.data.code;
    if (code == 200) {
      return Promise.resolve(xhr);
    }else if(response.status==403){//删除方法
      Message.error('请重新登录')
      router.push('/login')
    } else {
      Message.error(xhr.data.msg)
    }
  },
  error => {
    if(error.response.status==401){
      window.localStorage.removeItem('token'); //清除数据
      window.location.hash='#/login';
    }
    return Promise.reject(error)
  }
);

const fetch = (method,url,data)=>{
  if (method == 'post') {
    return service.post(url, { ...data})
  } else if (method == 'get') {
    return service.get(url, {
      params: data
    })
  }else if(method=='put'){
    return service.put(url,{
      ...data
    })
  }else if(method=='delete'){
    return service.delete(url, {
      data: data
    })
  }
}
export default fetch
