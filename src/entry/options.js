import Vue from 'vue'
import App from '../view/options.vue'
import ElementUI from 'element-ui'
// 引入element的样式
import 'element-ui/lib/theme-chalk/index.css'
const Util = require('@/utils/Util')
const Config = require('@/utils/Config')
const GlobalApi = require('@/api')
const ChromeStorage = require('@/utils/ChromeStorage')

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.Util = Util
Vue.prototype.Config = Config
Vue.prototype.GlobalApi = GlobalApi
Vue.prototype.ChromeStorage = ChromeStorage
Vue.prototype.$elMsg = ElementUI.Message

new Vue({
  render: (h) => h(App)
}).$mount('#app')
