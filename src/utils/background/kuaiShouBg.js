const Api = require('@/utils/api')
const kuaiShouBg = () => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message, sender, sendResponse)
    if (message.apiName === 'kuaiShouWdPhotoInfo') {
      Api.kuaiShouWdPhotoInfo(message.params).then(res => {
        console.log(res, 'sendResponse')
        const obj = { name: 'ougege', state: 200 }
        sendResponse(obj)
      }).catch(err => {
        sendResponse(JSON.stringify(err))
      })
    }
  })
}
module.exports = kuaiShouBg
