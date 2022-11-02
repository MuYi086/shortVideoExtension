const ChromeStorage = require('@/utils/ChromeStorage')
function btnGetUserInfo () {
  $('#btn-wrapper .btn-2').click(function () {
    ChromeStorage.get('token').then(res => {
      console.log(res)
    })
  })
}
module.exports = btnGetUserInfo