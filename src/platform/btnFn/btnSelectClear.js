const btnAlert = require('@/platform/btnFn/btnAlert')
const ChromeStorage = require('@/utils/ChromeStorage')
const Util = require('@/utils/Util')
function btnSelectClear () {
  $('#btn-wrapper .btn-selectClear').click(function () {
    ChromeStorage.remove('workList').then(() => {
      btnAlert('success', '已清空下拉框')
      Util.refresh()
    })
  })
}
module.exports = btnSelectClear