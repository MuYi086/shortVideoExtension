const Util = require('@/utils/Util')
const renderLogin = require('./renderLogin')
const renderPreview = require('./renderPreview')
const renderAlert = require('./renderAlert')
const render = function () {
  const btnFnInit = require('@/platform/btnFn')
  const monitorWrap = `<div id="monitor">${renderLogin}${renderPreview}</div>`
  $('body').append(monitorWrap)
  $('body').append(renderAlert)
  $('.selectpicker').selectpicker()
  Util.checkLogin().then(res => {
    if (res) {
      $('#previewWrap').show()
    } else {
      $('#loginWrap').show()
    }
    btnFnInit()
  })
}
module.exports = render

