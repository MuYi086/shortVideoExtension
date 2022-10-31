const $ = require('jquery')
const Util = require('@/utils/Util')
function btnLogin () {
  $('#btn-wrapper .btn-1').click(function () {
    Util.extenLogin()
  })
}
module.exports = btnLogin