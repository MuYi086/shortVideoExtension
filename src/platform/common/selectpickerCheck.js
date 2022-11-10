const btnAlert = require('@/platform/btnFn/btnAlert')
const selectpickerCheck = function () {
  const selectNameArr = $('#monitor .selectpicker').val()
  if (selectNameArr.length <= 0) {
    btnAlert('danger', '请于插件下拉框选择作品名称')
    return false
  } else {
    return true
  }
}
module.exports = selectpickerCheck