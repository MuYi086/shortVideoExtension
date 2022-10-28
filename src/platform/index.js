const Util = require('@/utils/Util')
const kuaiShouApp = require('./kuaiShou')
function pluginRegister () {
  const siteName = Util.judgeWebType()
  switch (siteName) {
    case 'douyin':
      break
    case 'kuaishou':
      return kuaiShouApp
    case 'kuaishouH5':
    case 'xigua':
      break
    case 'bilibili':
      break
    case 'haokan':
      break
    case 'sohu':
      break
    case 'weibo':
      break
    case 'youku':
      break
    case 'tudou':
      break
    case 'qq':
      break
    default:
      return kuaiShouApp
  }
}
module.exports = pluginRegister