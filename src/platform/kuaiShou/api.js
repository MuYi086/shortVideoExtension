const axios = require('@/utils/request')
// 快手网页
const kuaiShouGraphqlUrl = 'https://www.kuaishou.com/graphql'
const Api = {
  // 快手-获取信息
  kuaiShouGraphql: (params) => { return axios.post(kuaiShouGraphqlUrl, params).then(res => res.data) }
}
module.exports = Api