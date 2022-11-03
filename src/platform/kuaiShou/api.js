const axios = require('@/utils/request')
// 快手网页
const kuaiShouGraphqlUrl = 'https://www.kuaishou.com/graphql'
const Api = {
  // 快手-获取信息
  kuaiShouGraphql: (params) => { 
    return new Promise((resolve, reject) => {
      axios.post(kuaiShouGraphqlUrl, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })  
  }
}
module.exports = Api