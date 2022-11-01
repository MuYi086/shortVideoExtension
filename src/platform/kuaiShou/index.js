const render = require('../render/index')
const dataPreview = require('../render/dataPreview')
const pageFn = require('./pageFn')
const Api = require('./api')
const App = {
  render,
  dataPreview,
  Api,
  pageFn
}
module.exports = App