const axios = require('@/utils/request')
const Config = require('@/utils/Config')
// 快手网页
const kuaiShouGraphqlUrl = 'https://www.kuaishou.com/graphql'
const Api = {
  // 快手-获取信息
  kuaiShouGraphql: (params) => { 
    return new Promise((resolve, reject) => {
      axios.post(kuaiShouGraphqlUrl, params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })  
  },
  // 监测后台-查询插件侵权链接列表是否重复
  monitorWorkResultAuditUrlCheck: (params) => {
    return new Promise((resolve, reject) => {
      axios.post(`${Config.API_URL}monitor/workResultAudit/urlCheck`, params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
module.exports = Api