const btnAlert = require('@/platform/btnFn/btnAlert')
const ChromeStorage = require('@/utils/ChromeStorage')
const Util = require('@/utils/Util')
function btnWorkAdd () {
  $('#work-add .btn-workAdd').click(function () {
    const val = $(this).siblings('textarea').val()
    if (!val) {
      btnAlert('danger', 'IP名称不能为空')
    } else {
      // const dealIpStr = val.replace(/，/ig, ',')
      const ipArr = val.split('$')
      ChromeStorage.set('workList', ipArr).then(() => {
        btnAlert('success', '添加IP成功')
        Util.refresh()
      })
    }
  })
}
module.exports = btnWorkAdd