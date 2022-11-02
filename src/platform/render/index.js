const Util = require('@/utils/Util')
const renderLogin = require('./renderLogin')
const renderPreview = require('./renderPreview')
const renderAlert = require('./renderAlert')
const render = async function () {
  const btnFnInit = require('@/platform/btnFn')
  const renderPreviewHtml = await renderPreview()
  const renderLoginHtml = renderLogin()
  const renderAlertHtml = renderAlert()
  const monitorWrap = `<div id="monitor">${renderPreviewHtml}${renderLoginHtml}</div>`
  $('body').append(monitorWrap)
  $('body').append(renderAlertHtml)
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

