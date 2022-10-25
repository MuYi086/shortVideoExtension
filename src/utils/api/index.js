/* eslint-disable */
const apiFiles = require.context('./', true, /api_.*\.js/)
let Api = {}
apiFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = apiFiles(modulePath)
  Api = Object.assign(Api, value)
}, {})
module.exports = Api
