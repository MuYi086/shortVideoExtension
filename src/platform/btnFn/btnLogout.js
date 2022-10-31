const $ = require('jquery')
const Util = require('@/utils/Util')
const render = require('@/platform/render')
function btnLogout () {
  $('#btn-wrapper .btn-3').click(function () {
    console.log('点击了退出')
    Util.extenLogout().then(() => {
      render()
    })
  })
}
module.exports = btnLogout