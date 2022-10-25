const axios = require('axios')

kuaiShouH5GetDataStart()

// 包装
function kuaiShouH5GetDataStart () {
  return new Promise((resolve, reject) => {
    kuaiShouH5GetDataReal().then(res => {
      if (res.data.result === 2001) {
        kuaiShouVerifyCaptcha().then((captchaRes) => {
          console.log(captchaRes)
          if (captchaRes.data) {
            kuaiShouH5GetDataReal().then(h5Data => {
              resolve(h5Data)
            })
          } else {
            reject(captchaRes)
          }
        })
      } else {
        resolve(res)
      }
    })
  })
}

// 快手h5获取信息
function kuaiShouH5GetDataReal () {
  return new Promise((resolve, reject) => {
    const kuaiShouH5PhotoInfoUrl = 'https://m.gifshow.com/rest/wd/photo/info?kpn=undefined&captchaToken='
    const params = {
      env: '',
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
function kuaiShouVerifyCaptcha () {
  return new Promise((resolve, reject) => {
    const kuaiShouH5CaptchaUrl = 'https://m.gifshow.com/rest/wd/photo/info?kpn=undefined&captchaToken='
    const params = {
      env: '',
      h5Domain: 'm.gifshow.com',
      isLongVideo: false,
      photoId: '3xkvab2pug355nk'
    }
    axios.post(kuaiShouH5CaptchaUrl, params).then(res => {
      console.log('-------------------------kuaiShouH5CaptchaUrl----------------------')
      console.log(res.data)
      if (res.data) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}