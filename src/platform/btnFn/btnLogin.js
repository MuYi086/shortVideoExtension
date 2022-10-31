const $ = require('jquery')
const Util = require('@/utils/Util')
const render = require('@/platform/render')
function btnLogin () {
  $('#btn-wrapper .btn-1').click(function () {
    console.log('点击了登录')
    Util.extenLogin().then(() => {
      render()
    })
  })
}
module.exports = btnLogin