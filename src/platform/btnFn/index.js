const btnLogin = require('./btnLogin')
const btnLogout = require('./btnLogout')
const btnGetUserInfo = require('./btnGetUserInfo')
const btnFnInit = function () {
  btnLogin()
  btnLogout()
  btnGetUserInfo()
}
module.exports = btnFnInit