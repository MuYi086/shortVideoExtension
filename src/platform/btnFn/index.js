const btnLogin = require('./btnLogin')
const btnLogout = require('./btnLogout')
const btnSubmit = require('./btnSubmit')
const btnWorkAdd = require('./btnWorkAdd')
const btnSelectClear = require('./btnSelectClear')
const btnCollectList = require('./btnCollectList')
const btnFnInit = function () {
  btnLogin()
  btnLogout()
  btnSubmit()
  btnWorkAdd()
  btnSelectClear()
  btnCollectList()
}
module.exports = btnFnInit