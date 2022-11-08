const Config = require('./Config')
const type = require('./common/Type')
const ChromeStorage = require('./ChromeStorage')

// 小于10加0处理
function addZero (e) {
  return Number(e) < 10 ? `0${e}` : `${e}`
}

// new 一个时间戳:无参返回当前时间戳,有参返回传入时间的时间戳
function newTimeStamp (dateIn) {
  if (!dateIn) {
    return new Date().getTime()
  } else {
    const newDate = type.isDate(dateIn) ? dateIn : new Date(dateIn)
    return newDate.getTime()
  }
}

// 时间格式化
function formatDate (dateIn, fmt) {
  if (!fmt) return false
  if (type.isString(dateIn)) {
    dateIn = dateIn.replace(/\./g, '/')
    dateIn = dateIn.replace(/-/g, '/')
  }
  const newDate = type.isDate(dateIn) ? dateIn : new Date(dateIn)
  const o = {
    'y+': newDate.getFullYear(), // 年份
    'M+': addZero(newDate.getMonth() + 1), // 月份
    'd+': addZero(newDate.getDate()), // 某一天
    'h+': addZero(newDate.getHours()), // 小时
    'm+': addZero(newDate.getMinutes()), // 分钟
    's+': addZero(newDate.getSeconds()) // 秒
  }
  for (const i in o) {
    if (new RegExp('(' + i + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, o[i])
    }
  }
  return fmt
}

// 时间格式化
function formatDateTime (dateTime) {
  const newDate = dateTime ? new Date(dateTime.replace(/-/g, '/')) : new Date()
  const year = newDate.getFullYear()
  const month = newDate.getMonth() + 1
  const day = newDate.getDate()
  const weekDay = transWeekDay(newDate.getDay())
  const hour = addZero(newDate.getHours())
  const hour12 = hour >= 12 ? addZero(hour - 12) : hour
  const minute = addZero(newDate.getMinutes())
  const second = addZero(newDate.getSeconds())
  return {
    year,
    month,
    day,
    weekDay,
    hour,
    hour12,
    minute,
    second
  }
}

// 将weekday转换成星期几
function transWeekDay (e) {
  return ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][e]
}

// 判空
function judgeExcelNull (e) {
  return e ? Number(e) : 0
}

// 判断当前网站类型
function judgeWebType () {
  const { hostname } = window.location
  let siteName = ''
  for (let i = 0; i < Config.wholeSiteList.length; i++) {
    const li = Config.wholeSiteList[i]
    if (hostname.includes(li.thumb)) {
      siteName = li.name
      break
    }
  }
  return siteName
}

function getQuery (url) {
  // str为？之后的参数部分字符串
  const str = url.substr(url.indexOf('?') + 1)
  // arr每个元素都是完整的参数键值
  const arr = str.split('&')
  // result为存储参数键值的集合
  const result = {}
  for (let i = 0; i < arr.length; i++) {
    // item的两个元素分别为参数名和参数值
    const item = arr[i].split('=')
    result[item[0]] = item[1]
  }
  return result
}

// 毫秒转时分秒
function mSecondSTrans (mss) {
  const hours = Math.floor(mss / (1000 * 60 * 60))
  const minutes = Math.floor(mss / (1000 * 60))
  const seconds = Math.ceil((mss / (1000)) % 60)
  return hours > 0 ? `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}` : `00:${addZero(minutes)}:${addZero(seconds)}`
}

// 随机出指定范围内的整数
function getRandomInt (min, max) {
  if (min > max) {
    [min, max] = [max, min]
  }
  min = Math.floor(min)
  max = Math.ceil(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 使用对象构造url参数
function objToUrl (obj) {
  let url = ''
  Object.keys(obj).forEach((li, index) => {
    if (index === 0) {
      url+= `${li}=${type['isObject'](obj[li]) ? JSON.stringify(obj[li]) : obj[li]}`
    } else {
      url+= `&${li}=${type['isObject'](obj[li]) ? JSON.stringify(obj[li]) : obj[li]}`
    }
  })
  return url
}

// 浅拷贝
function shallowCopy (obj) {
  if (obj === null) {
    return null
  } else {
    return Object.create(
      Object.getPrototypeOf(obj),
      Object.getOwnPropertyDescriptors(obj)
    )
  }
}

// 深拷贝
function deepCopy (obj, clone = Array.isArray(obj) ? [] : {}) {
  if (obj != null && typeof obj === 'object') {
    for (const [key, value] of Object.entries(obj)) {
      clone[key] = deepCopy(value)
    }
  } else {
    clone = obj
  }
  return clone
}

// 获取快手url中的photoId
function getPhotoIdByKuaiShouUrl (url) {
  const pathname = url.split('?')[0]
  const pathnameArr = pathname.split('/')
  const len = pathnameArr.length
  const photoId = pathnameArr[len - 1]
  return { pathname, photoId }
}

// checkLogin
function checkLogin () {
  return ChromeStorage.get('token')
}

// 去除首尾空格
function trimSpace (str) {
  const str1 = str.replace(/^\s*/ig, '')
  const str2 = str1.replace(/\s*$/ig, '')
  return str2
}

// 快手caption去除@信息
function kuaiShouCaptionDeal (str) {
  const caption = str.replace(/\(O3\w*\)/ig, '')
  const caption1 = trimSpace(caption)
  return caption1
}

// 获取窗口的宽度和高度: 包含滚动条
function getWindowHeightWidth () {
  if (!Config.windowWH.windowW) {
    Config.windowWH = {
      windowW: window.innerWidth || document.documentElement.clientWidth,
      windowH: window.innerHeight || document.documentElement.clientHeight
    }
  }
  return Config.windowWH
}

// 观察者
const domWatch = function (domObj, callback, option = {childList: true, attributes: false, subtree: false, characterData: false}) {
  // const option = {
  //   childList: true, // 监听 target 节点中发生的节点的新增与删除
  //   attributes: false, // 当为 true 时观察所有监听的节点属性值的变化
  //   subtree: false, // 监听以 target 为根节点的整个子树。包括子树中所有节点的属性
  //   characterData: false // 节点内容或节点文本的变动
  // }
  return new DomWatchClass(domObj, callback, option)
}
const DomWatchClass = function (domObj, callback, option) {
  const domObserver = new MutationObserver(callback)
  domObserver.observe(domObj, option)
  this.tempObj = domObserver
  this.disconnect = function () {
    this.tempObj.disconnect()
  }
}

// 从快手带签名的图片img中提取出目录和地址
function dealKuaiShouImgSrc (src) {
  if (!src) return false
  const src1 = src.split('?')[0]
  const src2 = src1.replace(/.*com\//ig, '')
  return src2
}

// 以时间戳和随机数生成唯一id
function randomUniqueKey () {
  const timestamp = newTimeStamp()
  const randomNum = Math.ceil(Math.random() * 100000)
  return `${timestamp}-${randomNum}`
}

// 刷新
function refresh () {
   location.reload()
}

const Util = {
  addZero,
  newTimeStamp,
  formatDate,
  formatDateTime,
  transWeekDay,
  judgeExcelNull,
  judgeWebType,
  getQuery,
  mSecondSTrans,
  getRandomInt,
  objToUrl,
  shallowCopy,
  deepCopy,
  getPhotoIdByKuaiShouUrl,
  checkLogin,
  trimSpace,
  kuaiShouCaptionDeal,
  getWindowHeightWidth,
  domWatch,
  dealKuaiShouImgSrc,
  randomUniqueKey,
  refresh
}

module.exports = Util