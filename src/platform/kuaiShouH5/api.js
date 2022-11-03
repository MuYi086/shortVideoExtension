const axios = require('@/utils/request')
// 快手h5网页
const kuaiShouH5PhotoInfoUrl = 'https://m.gifshow.com/rest/wd/photo/info?kpn=undefined&captchaToken='
const Api = {
  // 快手-获取信息
  kuaiShouH5PhotoInfo: (params) => { return axios.post(kuaiShouH5PhotoInfoUrl, params).then(res => res.data) }
}
module.exports = Api