const Util = require('@/utils/Util')
const kuaiShouApp = require('./kuaiShou')
const kuaiShouH5App = require('./kuaiShouH5')
function pluginRegister () {
  const siteName = Util.judgeWebType(location.hostname, 0)
  switch (siteName) {
    case '西瓜视频':
      break
    case '哔哩哔哩':
      break
    case '腾讯视频':
      break
    case '优酷视频':
      break
    case '抖音短视频':
      break
    case '微博视频':
      break
    case '快手':
      return kuaiShouApp
    case '快手H5':
      return kuaiShouH5App
    case '小红书':
      break
    case '芒果tv':
      break
    case '今日头条':
      break
    default:
      return kuaiShouApp
  }
}
module.exports = pluginRegister