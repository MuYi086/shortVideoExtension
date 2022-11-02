const btnLogin = require('./btnLogin')
const btnLogout = require('./btnLogout')
const btnSubmit = require('./btnSubmit')
const btnSelect = require('./btnSelect')
const btnFnInit = function () {
  btnLogin()
  btnLogout()
  btnSubmit()
  btnSelect()
}
module.exports = btnFnInit