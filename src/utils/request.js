const axios = require('axios')
const ChromeStorage = require('@/utils/ChromeStorage')
// 来源：axios拦截器接口配置与使用
// https://www.jianshu.com/p/646ed4edf51f
axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000, // request timeout  设置请求超时时间
  responseType: 'json',
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})
// 请求拦截器
axios.interceptors.request.use(
  async function (headConfig) {
    const token = await ChromeStorage.get('token')
    if (token) {
      headConfig.headers.Authorization = `Bearer ${token}`
    }
    return headConfig
  },
  error => {
    return Promise.reject(error)
  }
)
module.exports = axios