const Util = require('@/utils/Util')
const kuaiShouApp = require('./kuaiShou')
const kuaiShouH5App = require('./kuaiShouH5')
function pluginRegister () {
  const siteName = Util.judgeWebType()
  switch (siteName) {
    case '抖音':
      break
    case '快手':
      return kuaiShouApp
    case '快手H5':
      return kuaiShouH5App
    case '西瓜':
      break
    case '哔哩哔哩':
      break
    case '好看':
      break
    case '搜狐':
      break
    case '微博':
      break
    case '优酷':
      break
    case '土豆':
      break
    case 'qq':
      break
    default:
      return kuaiShouApp
  }
}
module.exports = pluginRegister