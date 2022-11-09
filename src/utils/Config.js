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
  API_URL = 'https://626439j4z2.zicp.fun/'
}
const Config = {
  API_URL,
  windowWH,
  wholeSiteList: [ // 网站列表
    { url: 'https://*.ixigua.com/*', thumb: 'ixigua', ename: 'yg365', name: '西瓜视频' },
    { url: 'https://*.bilibili.com/*', thumb: 'bilibili', ename: 'bilibiliVideo', name: '哔哩哔哩' },
    { url: 'https://v.qq.com/*', thumb: 'tencent', ename: 'tencentVideo', name: '腾讯视频' },
    { url: 'https://v.youku.com/*', thumb: 'youku', ename: 'youkuVideo', name: '优酷视频' },
    { url: 'https://*.douyin.com/*', thumb: 'douyin', ename: 'douyinVideo', name: '抖音短视频' },
    { url: 'https://weibo.com/*', thumb: 'weibo', ename: 'weiboVideo', name: '微博视频' },
    { url: 'https://*.kuaishou.com/*', thumb: 'kuaishou', ename: 'kuaishouVideo', name: '快手' },
    { url: 'https://*.gifshow.com/*', thumb: 'gifshow', ename: 'gifshow', name: '快手H5' },
    { url: 'https://xiaohongshu.com/*', thumb: 'xiaohongshu', ename: 'xiaohongshuVideo', name: '小红书' },
    { url: 'https://www.mgtv.com/*', thumb: 'mgtv', ename: 'mgtvVideo', name: '芒果tv' },
    { url: 'https://www.toutiao.com/*', thumb: 'toutiao', ename: 'toutiaoVideo', name: '今日头条' }
    // { url: 'https://play.tudou.com/*', thumb: 'wxVideo', name: '微信视频号' },
  ]
}
module.exports = Config