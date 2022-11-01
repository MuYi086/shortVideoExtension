const ChromeStorage = require('@/utils/ChromeStorage')
function btnLogin () {
  $('#btn-wrapper .btn-login').click(function () {
    const params = {name: 'ougege'}
    ChromeStorage.set('userInfo', params).then(() => {
      $('#loginWrap').hide()
      $('#previewWrap').show()
    })
  })
}
module.exports = btnLogin