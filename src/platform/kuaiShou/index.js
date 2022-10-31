const render = require('../render/index')
const dataPreview = require('../render/dataPreview')
const pageFn = require('./pageFn')
const btnFnInit = require('../btnFn/index')
const Api = require('./api')
const App = {
  render,
  btnFnInit,
  dataPreview,
  Api,
  pageFn
}
module.exports = App