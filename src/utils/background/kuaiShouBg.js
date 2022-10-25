const Api = require('@/utils/api')
const kuaiShouBg = () => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.apiName === 'kuaiShouWdPhotoInfo') {
      kuaiShouH5GetDataReal().then(res => {
        // 需要验证
        if (res.result === 2001) {
          const { url, captchaSession } = JSON.parse(res.captchaConfig)
          console.log(url, captchaSession)
          sendResponse(url)
        } else {
          console.log('拿到结果',res)
          sendResponse(res)
        }
      }).catch(err => {
        sendResponse(err)
      })
    }
  })
}
// 快手h5获取信息
function kuaiShouH5GetDataReal () {
  return new Promise((resolve, reject) => {
    const params = {
      env: 'SHARE_VIEWER_ENV_TX_TRICK',
      h5Domain: 'm.gifshow.com',
      isLongVideo: false,
      photoId: '3xkvab2pug355nk'
    }
    Api.kuaiShouWdPhotoInfo(params).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
module.exports = kuaiShouBg
