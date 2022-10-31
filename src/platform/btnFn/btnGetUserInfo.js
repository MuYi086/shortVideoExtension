const $ = require('jquery')
const Util = require('@/utils/Util')
function btnGetUserInfo () {
  $('#btn-wrapper .btn-2').click(function () {
    Util.getUserInfo().then(res => {
      console.log('这是登录信息', res)
    })
  })
}
module.exports = btnGetUserInfo