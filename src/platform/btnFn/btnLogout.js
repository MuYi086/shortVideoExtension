const ChromeStorage = require('@/utils/ChromeStorage')
function btnLogout () {
  $('#btn-wrapper .btn-logout').click(function () {
    ChromeStorage.remove('userInfo').then(() => {
      $('#previewWrap').hide()
      $('#loginWrap').show()
    })
  })
}
module.exports = btnLogout