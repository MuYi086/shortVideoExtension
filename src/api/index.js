const axios = require('@/utils/request')
const Config = require('@/utils/Config')
const GlobalApi = {
  // 监测后台-登录
  login: (params) => { return axios.post(`${Config.API_URL}login`, params).then(res => res.data) },
  // 监测后台-获取插件项目列表
  monitorProjectWorkPlug: (params) => { 
    return new Promise((resolve, reject) => {
      axios.get(`${Config.API_URL}monitor/projectWork/plug`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    }) 
  }
}
module.exports = GlobalApi