import axios from 'axios'

const service = axios.create({
  baseURL: '/api',
  withCredentials: true,
  timeout: 5000,
  headers: {'Content-Type': 'application/json'}
})

service.interceptors.request.use(config => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  })

service.interceptors.response.use(
  (response) => {
    console.log(response.data)
    return response.data
  },
  async (error) => {
    return Promise.reject(error.response?.data)
  }
)

export default service