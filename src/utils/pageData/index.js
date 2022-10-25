const Util = require('../Util')
const kuaiShouDataH5 = require('./kuaiShouDataH5')
class PageData {
  constructor () {}
  init () {
    switch (Util.judgeWebType()) {
      case 'douyin':
        break
      case 'kuaishou':
        return kuaiShouDataH5.getPageData()
      case 'kuaishouH5':
        return kuaiShouDataH5.getPageData()
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
        break
    }
  }
}
const pageData = new PageData()
module.exports = pageData