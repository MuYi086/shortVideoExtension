const ChromeStorage = require('@/utils/ChromeStorage')
const BackgroundMsg = function () {
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log(msg, sender, sendResponse)
    switch (msg.name) {
      case 'storage_set_userInfo':
        ChromeStorage.set('userInfo', msg.params).then(() => {
          sendResponse('已经登录')
        })
        break
      default:
        break
    }
    return true
  })
}
module.exports = BackgroundMsg