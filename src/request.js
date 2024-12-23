import axios from 'axios'
import {useUserStore} from "@/stores/user.js";

const service = axios.create({
  baseURL: '/api',
  // baseURL: 'https://www.xjtd.store',
  withCredentials: true,
  timeout: 10000,
  headers: {'Content-Type': 'application/json'}
})

service.interceptors.request.use(config => {
    console.log(`请求地址【${config.url}】---入参---`, config.data || config.params)
    config.headers['shopDomain'] = useUserStore().shopId

    return config
  },
  (error) => {
    return Promise.reject(error)
  })

service.interceptors.response.use(
  (response) => {

    console.log(`请求地址【${response.config.url}】---结果---`, response.data)
    return response.data
  },
  async (error) => {
    return Promise.reject(error.response?.data)
  }
)
export default service