const axios = require('axios')
const Config = require('@/utils/Config')
const GlobalApi = {
  // 监测后台-登录
  login: (params) => { return axios.post(`${Config.API_URL}login`, params).then(res => res.data) }
}
module.exports = GlobalApi