const ChromeStorage = require('@/utils/ChromeStorage')
function btnLogout () {
  $('#btn-wrapper .btn-logout').click(function () {
    ChromeStorage.remove('token').then(() => {
      $('#previewWrap').hide()
      $('#loginWrap').show()
    })
  })
}
module.exports = btnLogout