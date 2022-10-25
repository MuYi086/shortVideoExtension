// const Api = require('./src/utils/api')
// console.log(Api)
const axios = require('axios')
kuaiShouH5GetDataStart()

// 包装
function kuaiShouH5GetDataStart () {
  kuaiShouH5GetDataReal().then(res => {
    console.log(res)
    // 需要验证
    if (res.result === 2001) {
      const { url, captchaSession } = JSON.parse(res.captchaConfig)
      console.log(url, captchaSession)
    }
  }).catch(err => {
    console.log(err)
  })
}

// 快手h5获取信息
function kuaiShouH5GetDataReal () {
  return new Promise((resolve, reject) => {
    const kuaiShouH5PhotoInfoUrl = 'https://m.gifshow.com/rest/wd/photo/info?kpn=undefined&captchaToken='
    const params = {
      env: 'SHARE_VIEWER_ENV_TX_TRICK',
      h5Domain: 'm.gifshow.com',
      isLongVideo: false,
      photoId: '3xkvab2pug355nk'
    }
    axios.post(kuaiShouH5PhotoInfoUrl, params).then(res => {
      console.log('-------------------------kuaiShouH5PhotoInfoUrl----------------------')
      if (res.data) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

// 快手验证码校验
// function kuaiShouVerifyCaptcha () {
//   return new Promise((resolve, reject) => {
//     const kuaiShouH5CaptchaUrl = 'https://m.gifshow.com/rest/wd/photo/info?kpn=undefined&captchaToken='
//     const params = {
//       env: '',
//       h5Domain: 'm.gifshow.com',
//       isLongVideo: false,
//       photoId: '3xkvab2pug355nk'
//     }
//     axios.post(kuaiShouH5CaptchaUrl, params).then(res => {
//       console.log('-------------------------kuaiShouH5CaptchaUrl----------------------')
//       console.log(res.data)
//       if (res.data) {
//         resolve(res.data)
//       }
//     }).catch(err => {
//       reject(err)
//     })
//   })
// }