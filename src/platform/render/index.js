const Util = require('@/utils/Util')
const renderLogin = require('./renderLogin')
const renderPreview = require('./renderPreview')
const renderAlert = require('./renderAlert')
const renderClear = require('./renderClear')
const ChromeStorage = require('@/utils/ChromeStorage')
const CountDown = require('@/utils/common/CountDown')
const render = async function () {
  if (CountDown()) {
    renderClear()
    const renderPreviewHtml = await renderPreview()
    const renderLoginHtml = renderLogin()
    const renderAlertHtml = renderAlert()
    const monitorWrap = `<div id="monitor">${renderPreviewHtml}${renderLoginHtml}</div>`
    // 优先渲染提示组件,方便后续接口报错可以弹出提示
    $('body').append(renderAlertHtml)
    $('body').append(monitorWrap)
    const selectpickerCurrent = await ChromeStorage.get('selectpicker-current')
    $('.selectpicker-project').selectpicker('val', '')
    $('.selectpicker-ip').selectpicker('val', selectpickerCurrent)
    const btnFnInit = require('@/platform/btnFn')
    // btnFn中select结构体是动态生成的
    Util.checkLogin().then(res => {
      if (res) {
        $('#previewWrap').show()
      } else {
        $('#loginWrap').show()
      }
      btnFnInit()
    })
  }
}
module.exports = render

