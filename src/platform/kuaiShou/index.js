const renderPlugin = require('../common/renderPlugin')
const pageFn = require('./pageFn')
const Api = require('./api')
const App = {
  renderPlugin,
  Api,
  pageFn
}
module.exports = App