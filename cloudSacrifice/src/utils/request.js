// 封装axios请求模块
import theAxios from 'axios'
import store from '@/store'
const axios = theAxios.create({
  baseURL: 'http://47.94.41.119:9999', // 基础路径
  timeout: 20000 // 20秒超时时间（请求20秒无响应直接判定超时）
})
// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    const { token } = store.state
    if (token) {
      config.headers.Authorization = `${store.state.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 其参数是解构赋值的默认写法
export default ({
  url,
  method = 'GET',
  params = {},
  data = {},
  headers = {}
}) => {
  return axios({
    url,
    method,
    params,
    data,
    headers
  })
}
