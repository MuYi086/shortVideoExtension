const axios = require('@/utils/request')
const Config = require('@/utils/Config')
const GlobalApi = {
  // 监测后台-登录
  login: (params) => {
    return new Promise((resolve, reject) => {
      return axios.post(`${Config.API_URL}login`, params).then(res =>  {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 监测后台-获取插件项目列表(已废弃)
  // monitorProjectWorkPlug: (params) => {
  //   return new Promise((resolve, reject) => {
  //     axios.get(`${Config.API_URL}monitor/projectWork/plug`, params).then(res => {
  //       resolve(res)
  //     }).catch(err => {
  //       reject(err)
  //     })
  //   }) 
  // },
  // 监测后台-新增插件作品导入
  monitorWorkResultAuditPlug: (params) => { 
    return new Promise((resolve, reject) => {
      axios.post(`${Config.API_URL}monitor/workResultAudit/plug`, params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    }) 
  },
  // 监测后台-插件查询该用户下收藏未审核列表
  monitorWorkResultAuditUrlCollectList: (params) => {
    return new Promise((resolve, reject) => {
      axios.post(`${Config.API_URL}monitor/workResultAudit/urlCollectList`, params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    }) 
  },
  // 监测后台-查询监测项目列表
  monitorProjectList: (params) => {
    return new Promise((resolve, reject) => {
      axios.get(`${Config.API_URL}monitor/project/list`, params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    }) 
  }
}
module.exports = GlobalApi