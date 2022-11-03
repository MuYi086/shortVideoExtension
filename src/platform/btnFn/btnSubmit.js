const GlobalApi = require('@/api')
const btnAlert = require('@/platform/btnFn/btnAlert')
function btnSubmit () {
  $('#btn-wrapper .btn-submit').click(function () {
    const sid = $('#monitor .selectpicker').val()
    if (!sid) {
      btnAlert('danger', '请选择一个ip名称')
      return false
    }
    const params = {
      sid: sid
    }
    GlobalApi.login(params).then(res => {
      if (res.data) {
        btnAlert('success', '提交成功')
      } else {
        btnAlert('danger', res.msg)
      }
    })
  })
}
module.exports = btnSubmit