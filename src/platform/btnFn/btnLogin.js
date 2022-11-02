const ChromeStorage = require('@/utils/ChromeStorage')
const GlobalApi = require('@/api')
function btnLogin () {
  $('#btn-wrapper .btn-login').click(function () {
    const { username, password } = formCheck()
    console.log(username, password)
    const params = {
      username: username,
      password: password
    }
    GlobalApi.login(params).then(res => {
      if (res.data) {
        ChromeStorage.set('token', res.data.token).then(() => {
          $('#loginWrap').hide()
          $('#previewWrap').show()
        })
      }
    }).catch(err => {
      console.log(err)
    })
  })
}
function formCheck () {
  const username = $('#login-username').val()
  const password = $('#login-password').val()
  return { username, password }
}
module.exports = btnLogin