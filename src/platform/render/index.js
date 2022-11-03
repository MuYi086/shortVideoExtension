const Util = require('@/utils/Util')
const renderLogin = require('./renderLogin')
const renderPreview = require('./renderPreview')
const renderAlert = require('./renderAlert')
const renderSelect = require('./renderSelect')
const ChromeStorage = require('@/utils/ChromeStorage')
const render = async function () {
  const renderPreviewHtml = renderPreview()
  const renderLoginHtml = renderLogin()
  const renderAlertHtml = renderAlert()
  const selectHtml = await renderSelect()
  const monitorWrap = `<div id="monitor">${renderPreviewHtml}${renderLoginHtml}</div>`
  const selectpickerCurrent = await ChromeStorage.get('selectpicker-current')
  $('body').append(monitorWrap)
  $('body').append(renderAlertHtml)
  console.log(selectHtml)
  $(selectHtml).prependTo('body #previewWrap')
  $('.selectpicker').selectpicker('val', selectpickerCurrent)
  // btnFn中select结构体是动态生成的
  const btnFnInit = require('@/platform/btnFn')
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

