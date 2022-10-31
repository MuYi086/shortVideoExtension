const btnLogin = require('./btnLogin')
const btnLogout = require('./btnLogout')
const btnGetUserInfo = require('./btnGetUserInfo')
const btnFn = [
  btnLogin,
  btnLogout,
  btnGetUserInfo
]
const btnFnInit = function () {
  btnFn.forEach(li => {
    li()
  })
}
module.exports = btnFnInit