// 引入 axios
import axios from 'axios'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from "element-plus"
import { useUserStore } from '@/stores/user'

// 创建 axios 实例
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// 添加请求拦截器
httpInstance.interceptors.request.use(config => {
  //从pinia中获取token数据
  const userStore = useUserStore()
  //按照后端要求拼接token数据
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  // 你可以在这里添加  token 或者其他自定义设置
  return config
}, e => {
  // 处理请求错误
  return Promise.reject(e)
})

// 添加响应拦截器
httpInstance.interceptors.response.use(res =>res.data, e=> {
  //统一错误提示
  ElMessage({
    tape: 'warning',
    message: e.response.data.message
  })
  // 对响应数据做处理
  return response.data
})

// 导出 axios 实例
export default httpInstance
