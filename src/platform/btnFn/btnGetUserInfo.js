const $ = require('jquery')
const ChromeStorage = require('@/utils/ChromeStorage')
function btnGetUserInfo () {
  $('#btn-wrapper .btn-2').click(function () {
    console.log('点击了获取')
    ChromeStorage.get('userInfo').then(res => {
      console.log(res)
    })
  })
}
module.exports = btnGetUserInfo