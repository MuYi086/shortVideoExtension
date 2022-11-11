const btnAlert = require('@/platform/btnFn/btnAlert')
const selectpickerCheckIp = function () {
  const selectNameArr = $('#monitor .selectpicker-ip').val()
  if (!selectNameArr || selectNameArr.length <= 0) {
    btnAlert('danger', '请于插件下拉框选择IP')
    return false
  } else {
    return selectNameArr
  }
}
module.exports = selectpickerCheckIp