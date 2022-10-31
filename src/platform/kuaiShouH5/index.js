const renderPlugin = require('../common/renderPlugin')
const renderData = require('../common/renderData')
const pageFn = require('./pageFn')
const Api = require('./api')
const App = {
  renderPlugin,
  renderData,
  Api,
  pageFn
}
module.exports = App