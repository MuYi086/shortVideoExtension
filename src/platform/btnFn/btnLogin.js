const ChromeStorage = require('@/utils/ChromeStorage')
const GlobalApi = require('@/api')
const btnAlert = require('@/platform/btnFn/btnAlert')
function btnLogin () {
  $('#btn-wrapper .btn-login').click(function () {
    const username = $('#login-username').val()
    const password = $('#login-password').val()
    if (!username || !password) {
      btnAlert('danger', '用户名或密码不能为空')
      return false
    }
    const params = {
      username: username,
      password: password
    }
    GlobalApi.login(params).then(res => {
      if (res.data) {
        ChromeStorage.set('token', res.data.token).then(() => {
          $('#loginWrap').hide()
          $('#previewWrap').show()
          btnAlert('success', '登录成功')
        })
      } else {
        btnAlert('danger', res.msg)
      }
    })
  })
}
module.exports = btnLogin