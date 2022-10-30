export const sendMsg = function (msg, cb) {
  chrome.runtime.sendMessage(msg, function (data) {
    cb(data)
  })
}
export const onMsg = function () {
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log(msg, sender, sendResponse)
    if (msg.name === 'contentscript') {
      const info = {tips: 'ougege你好'}
      sendResponse(info)
    }
  })
}
