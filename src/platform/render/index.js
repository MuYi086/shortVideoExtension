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
    const renderAlertHtml = renderAlert()
    // 优先渲染提示组件,方便后续接口报错可以弹出提示
    $('body').append(renderAlertHtml)
    const renderPreviewHtml = await renderPreview()
    const renderLoginHtml = renderLogin()
    const monitorWrap = `<div id="monitor">${renderPreviewHtml}${renderLoginHtml}</div>`
    $('body').append(monitorWrap)
    const storageSelectpickerProject = await ChromeStorage.get('selectpicker-project')
    const storageSelectpickerIp = await ChromeStorage.get('selectpicker-ip')
    $('.selectpicker-project').selectpicker('val', storageSelectpickerProject)
    $('.selectpicker-ip').selectpicker('val', storageSelectpickerIp)
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

