import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import sys from '../sys'
import {getToken, removeToken} from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  // headers: {'Content-Type': 'application/json'}, //自定义请求头
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // if (sys.getters.token) {
  config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  // config.headers['Authorization'] = '1a981cba-f750-43f9-8990-9bce3f26fdde' // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.header.retStatus !== 'success') {
      Message({
        message: res.header.msg.length < 10 ? res.header.msg : res.header.msg.substring(0, 10),
        type: 'error',
        duration: 3 * 1000
      })

      //暂时替代——没有写登出操作
      if ("10007950301" == res.header.retCode) {
        removeToken();
        location.reload();
      }

      // 401:未登录;
      // if (res.code === 401||res.code === 403) {
      //   MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
      //     confirmButtonText: '重新登录',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     sys.dispatch('FedLogOut').then(() => {
      //       location.reload()// 为了重新实例化vue-router对象 避免bug
      //     })
      //   })
      // }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
