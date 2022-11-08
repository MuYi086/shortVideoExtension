const btnLogin = require('./btnLogin')
const btnLogout = require('./btnLogout')
const btnSubmit = require('./btnSubmit')
const btnWorkAdd = require('./btnWorkAdd')
const btnFnInit = function () {
  btnLogin()
  btnLogout()
  btnSubmit()
  btnWorkAdd()
}
module.exports = btnFnInit