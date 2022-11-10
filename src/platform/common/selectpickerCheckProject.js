const btnAlert = require('@/platform/btnFn/btnAlert')
const selectpickerCheckProject = function () {
  const selectNameArr = $('#monitor .selectpicker-project').val()
  if (selectNameArr.length <= 0) {
    btnAlert('danger', '请于插件下拉框选择项目')
    return false
  } else {
    return true
  }
}
module.exports = selectpickerCheckProject