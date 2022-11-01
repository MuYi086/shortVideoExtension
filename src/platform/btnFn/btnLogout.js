const $ = require('jquery')
// const ChromeStorage = require('@/utils/ChromeStorage')
// const render = require('@/platform/render')
function btnLogout () {
  $('#btn-wrapper .btn-3').click(function () {
    console.log('点击了退出')
    // ChromeStorage.remove('userInfo').then(() => {
    //   render()
    // })
  })
}
module.exports = btnLogout