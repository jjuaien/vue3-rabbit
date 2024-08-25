//封装所有和用户相关的api
import httpInstance from "@/utils/http"

export const loginAPI = ({ account, password }) => {
  return httpInstance({
    url: '/login',
    method: 'POST',
    data: {
      account,
      password
    }
  })
}