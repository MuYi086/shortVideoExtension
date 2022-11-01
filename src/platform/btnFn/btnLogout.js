const $ = require('jquery')
const ChromeStorage = require('@/utils/ChromeStorage')
function btnLogout () {
  $('#btn-wrapper .btn-3').click(function () {
    ChromeStorage.remove('userInfo').then(() => {
      $('#previewWrap').hide()
      $('#loginWrap').show()
    })
  })
}
module.exports = btnLogout