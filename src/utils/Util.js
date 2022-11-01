const Config = require('./Config')
const type = require('./common/Type')
const ChromeStorage = require('./ChromeStorage')
// const ChromeMsg = require('./ChromeMsg')

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
  return ChromeStorage.get('userInfo')
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
  checkLogin
}

module.exports = Util