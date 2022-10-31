const $ = require('jquery')
const Util = require('@/utils/Util')
function btnLogout () {
  $('#btn-wrapper .btn-3').click(function () {
    console.log('点击了退出')
    Util.extenLogout()
  })
}
module.exports = btnLogout