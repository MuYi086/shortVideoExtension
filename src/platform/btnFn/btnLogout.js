const ChromeStorage = require('@/utils/ChromeStorage')
const Util = require('@/utils/Util')
function btnLogout () {
  $('#btn-wrapper .btn-logout').click(function () {
    ChromeStorage.remove('token').then(() => {
      // $('#previewWrap').hide()
      // $('#loginWrap').show()
      Util.refresh()
    })
  })
}
module.exports = btnLogout