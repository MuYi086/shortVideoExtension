const pluginRegister = require('@/platform/index')
const App = pluginRegister()
console.log(App)
App.render(App.btnFnInit)
// App.pageFn()