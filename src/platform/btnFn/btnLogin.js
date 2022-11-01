const $ = require('jquery')
const ChromeStorage = require('@/utils/ChromeStorage')
function btnLogin () {
  $('#btn-wrapper .btn-1').click(function () {
    const params = {name: 'ougege'}
    ChromeStorage.set('userInfo', params).then(() => {
      $('#loginWrap').hide()
      $('#previewWrap').show()
    })
  })
}
module.exports = btnLogin