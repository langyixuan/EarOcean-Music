/**
 * axios请求的封装
 */

import axios from 'axios'
import nProgress from 'nprogress';
import NProgress from "nprogress";
import 'nprogress/nprogress.css'

// 创建axios实例，设置请求的默认配置
const instance = axios.create({
  baseURL: '/api',
  timeout: 10000
})

instance.defaults.withCredentials = true

/**
 * 创建拦截器，处理请求和响应拦截
 */
// 错误信息处理函数, 用于根据状态码判断相应的错误信息
const errorHandel = (status, others) => {
  switch (status) {
    case 400:
      console.log("请求的参数错误");
      break;
    case 401:
      console.log("用户信息验证失败");
      break;
    case 403:
      console.log("服务器拒绝本次访问");
      break;
    case 404:
      console.log("请求资源没有找到");
      break;
    case 500:
      console.log("内部服务器错误");
      break;
    case 501:
      console.log("服务器不支持该请求中使用的方法");
      break;
    case 502:
      console.log("网关错误");
      break;
    case 504:
      console.log("网关超时");
      break;
    default:
      console.log(others);
      break;
  }
}
// 添加请求拦截器
instance.interceptors.request.use(config => {
  // 出现进度条
  NProgress.start()
  return config;
}, error => Promise.reject(error));

//添加响应拦截器
instance.interceptors.response.use(response => {
  NProgress.done()
  return response.status === 200 ? Promise.resolve(response) : Promise.reject(response)
}, error => {
  const { response } = error;
  if (response) {
    errorHandel(response.status, response.data)
    return Promise.reject(response)
  } else {
    // 如果没有响应信息， 说明服务器没有响应
    console.log("请求被中断");
  }
});

// 配置NProgress进度条
NProgress.configure({ showSpinner: true });
nProgress.configure({ ease: 'ease-in-out', speed: 1000 })
nProgress.configure({ minimum: 0.5 })
nProgress.set(1)
export default instance;