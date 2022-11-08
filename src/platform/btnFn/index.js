const btnLogin = require('./btnLogin')
const btnLogout = require('./btnLogout')
const btnSubmit = require('./btnSubmit')
const btnWorkAdd = require('./btnWorkAdd')
const btnSelectClear = require('./btnSelectClear')
const btnFnInit = function () {
  btnLogin()
  btnLogout()
  btnSubmit()
  btnWorkAdd()
  btnSelectClear()
}
module.exports = btnFnInit