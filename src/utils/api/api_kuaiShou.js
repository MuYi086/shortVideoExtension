const axios = require('axios')
// 快手网页
const kuaiShouGraphqlUrl = 'https://www.kuaishou.com/graphql'
// 快手h5
const kuaiShouH5PhotoInfoUrl = 'https://m.gifshow.com/rest/wd/photo/info?kpn=undefined&captchaToken='

const kuaiShouApi = {
  // 快手-获取信息
  kuaiShouGraphql: (params) => { return axios.post(kuaiShouGraphqlUrl, params).then(res => res.data) },
  // 快手-h5-获取主体信息
  // kuaiShouWdPhotoInfo: (params) => { return axios.post(kuaiShouH5PhotoInfoUrl, params).then(res => res.data) }
  kuaiShouWdPhotoInfo: async (params) => {
    const response = await fetch(kuaiShouH5PhotoInfoUrl, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        // 'Origin': 'https://m.gifshow.com',
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(params)
    })
    return response.json()
  }
}
module.exports = kuaiShouApi