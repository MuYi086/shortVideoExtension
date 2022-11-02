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
    { url: 'https://*.douyin.com/*', thumb: 'douyin', name: 'douyin' },
    { url: 'https://*.kuaishou.com/*', thumb: 'kuaishou', name: 'kuaishou' },
    { url: 'https://*.gifshow.com/*', thumb: 'gifshow', name: 'kuaishouH5' },
    { url: 'https://*.ixigua.com/*', thumb: 'xigua', name: 'xigua' },
    { url: 'https://*.bilibili.com/*', thumb: 'bilibili', name: 'bilibili' },
    { url: 'https://haokan.baidu.com/*', thumb: 'haokan', name: 'haokan' },
    { url: 'https://tv.sohu.com/*', thumb: 'sohu', name: 'sohu' },
    { url: 'https://weibo.com/*', thumb: 'weibo', name: 'weibo' },
    { url: 'https://v.youku.com/*', thumb: 'youku', name: 'youku' },
    { url: 'https://play.tudou.com/*', thumb: 'tudou', name: 'tudou' },
    { url: 'https://v.qq.com/*', thumb: 'qq', name: 'qq' },
  ]
}
module.exports = Config