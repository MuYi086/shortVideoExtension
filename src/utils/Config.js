let API_URL = 'http://192.168.1.58:8094/'
const windowWH = { windowW: null, windowH: null } // 全局的窗口高度和宽度
// 开发环境
if (process.env.NODE_ENV === 'development') {
  API_URL = 'https://626439j4z2.zicp.fun/'
}
// 测试环境
if (process.env.NODE_ENV === 'test') {
  API_URL = 'http://192.168.1.58:8094/'
}
// 生产环境
if (process.env.NODE_ENV === 'production') {
  API_URL = 'http://192.168.1.58:8094/'
}
const Config = {
  API_URL,
  windowWH,
  wholeSiteList: [ // 网站列表
    { url: 'https://*.douyin.com/*', thumb: 'douyin', name: '抖音' },
    { url: 'https://*.kuaishou.com/*', thumb: 'kuaishou', name: '快手' },
    { url: 'https://*.gifshow.com/*', thumb: 'gifshow', name: '快手H5' },
    { url: 'https://*.ixigua.com/*', thumb: 'xigua', name: '西瓜' },
    { url: 'https://*.bilibili.com/*', thumb: 'bilibili', name: '哔哩哔哩' },
    { url: 'https://haokan.baidu.com/*', thumb: 'haokan', name: '好看' },
    { url: 'https://tv.sohu.com/*', thumb: 'sohu', name: '搜狐' },
    { url: 'https://weibo.com/*', thumb: 'weibo', name: '微博' },
    { url: 'https://v.youku.com/*', thumb: 'youku', name: '优酷' },
    { url: 'https://play.tudou.com/*', thumb: 'tudou', name: '土豆' },
    { url: 'https://v.qq.com/*', thumb: 'qq', name: 'qq' },
  ]
}
module.exports = Config