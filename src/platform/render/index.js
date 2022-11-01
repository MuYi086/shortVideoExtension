const Util = require('@/utils/Util')
const renderClear = require('./renderClear')
const renderLogin = require('./renderLogin')
const renderPlugin = require('./renderPlugin')
const render = function (cb = function () { console.log('可以加载回调') }) {
  renderClear()
  Util.checkLogin().then(res => {
    console.log(res, '--------check--------')
    if (res) {
      renderPlugin(cb)
    } else {
      renderLogin(cb)
    }
  })
}
module.exports = render

