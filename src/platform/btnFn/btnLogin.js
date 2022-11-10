const ChromeStorage = require('@/utils/ChromeStorage')
const GlobalApi = require('@/api')
const btnAlert = require('@/platform/btnFn/btnAlert')
const Util = require('@/utils/Util')
// const render = require('@/platform/render')
// const renderSelect = require('@/platform/render/renderSelect')
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
      if (res.data.data) {
        ChromeStorage.set('token', res.data.data.token).then(() => {
          // $('#loginWrap').hide()
          // $('#previewWrap').show()
          // renderSelect()
          btnAlert('success', '登录成功')
          Util.refresh()
          // render()
        })
      } else {
        btnAlert('danger', res.data.msg)
      }
    })
  })
}
module.exports = btnLogin