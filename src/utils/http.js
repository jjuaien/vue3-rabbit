// 引入 axios
import axios from 'axios'

// 创建 axios 实例
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// 添加请求拦截器
httpInstance.interceptors.request.use(config => {
  // 你可以在这里添加 token 或者其他自定义设置
  return config
}, error => {
  // 处理请求错误
  return Promise.reject(error)
})

// 添加响应拦截器
httpInstance.interceptors.response.use(response => {
  // 对响应数据做处理
  return response.data
}, error => {
  // 处理响应错误
  return Promise.reject(error)
})

// 导出 axios 实例
export default httpInstance
