const $ = require('jquery')
const Util = require('@/utils/Util')
function btnLogin () {
  $('#btn-wrapper .btn-1').click(function () {
    console.log('点击了登录')
    Util.extenLogin()
  })
}
module.exports = btnLogin