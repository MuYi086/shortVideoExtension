const Util = require('@/utils/Util')
const renderLogin = require('./renderLogin')
const renderPreview = require('./renderPreview')
const render = function () {
  const btnFnInit = require('@/platform/btnFn')
  const monitorWrap = `<div id="monitor">${renderLogin}${renderPreview}</div>`
  $('body').append(monitorWrap)
  Util.checkLogin().then(res => {
    if (res) {
      $('#loginWrap').hide()
    } else {
      $('#previewWrap').hide()
    }
    btnFnInit()
  })
}
module.exports = render

