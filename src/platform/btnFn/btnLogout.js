const $ = require('jquery')
const Util = require('@/utils/Util')
function btnLogout () {
  $('#btn-wrapper .btn-3').click(function () {
    Util.extenLogout()
  })
}
module.exports = btnLogout