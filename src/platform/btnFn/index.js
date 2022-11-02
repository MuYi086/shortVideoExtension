const btnLogin = require('./btnLogin')
const btnLogout = require('./btnLogout')
const btnSubmit = require('./btnSubmit')
const btnFnInit = function () {
  btnLogin()
  btnLogout()
  btnSubmit()
}
module.exports = btnFnInit