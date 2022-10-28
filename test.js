const Util = require('./src/utils/Util')
const axios = require('axios')
const murmurHash3 = require('murmurhash3js')
const kuaiShouEnctrypt = require('./src/platform/common/kuaiShouEncrypt')
const fingerJson = require('./src/utils/json/fingerprint.json')
const currentFingerprint = randomGetOneFingerprint(fingerJson)
kuaiShouH5GetDataStart()

// 随机获取一个fingerprint
function randomGetOneFingerprint (json) {
  const len = json.length
  const index = Util.getRandomInt(0, len)
  return json[index]
}

// 构造一个轨迹信息结构体
function constructTrackObj (data, trajectory) {
  const { captchaSn, bgPicHeight, cutPicWidth, cutPicHeight, x, y, realSize, scaleRatio } = getCaptchaAttr(data)
  const obj = {
    captchaSn: captchaSn,
    bgDisWidth: realSize,
    bgDisHeight: Math.floor(bgPicHeight * scaleRatio),
    cutDisWidth: Math.floor(cutPicWidth * scaleRatio),
    cutDisHeight: Math.floor(cutPicHeight * scaleRatio),
    relativeX: x,
    relativeY: y,
    trajectory: trajectory,
    gpuInfo: currentFingerprint[17]['info'],
    captchaExtraParam: getExtraParam()  // 对浏览器指纹信息进行mmh3算法加密 然后参数组合拼接
  }
  return obj
}

// 包装
function kuaiShouH5GetDataStart () {
  const url = 'https://www.kuaishou.com/short-video/3xkvab2pug355nk?authorId=3xk465755wmpgu4&streamSource=search&area=searchxxnull&searchKey=破事精英'
  const { pathname, photoId } = dealUrl(url)
  kuaiShouH5GetDataReal(photoId).then(res => {
    // 需要验证
    if (res.result === 2001) {
      const { url, captchaSession } = JSON.parse(res.captchaConfig)
      kuaiShouVerifyCaptcha(url, captchaSession, pathname).then(data => {
        const assignData = getCaptchaAttr(data)
        // 滑动轨迹
        const trajectory = createSlideTrack(assignData.distance, Util.newTimeStamp(), assignData.x)
        // 轨迹信息结构体
        const trackObj = constructTrackObj(assignData, trajectory)
        // 构造plaintext
        const plaintext = Util.objToUrl(trackObj)
        // 计算ciphertext
        const ciphertext = kuaiShouEnctrypt.encrypt(plaintext)
        // 获取captchaToken
        getCaptchaToken(ciphertext, pathname).then(res => {
          console.log('-------------------------captchaToken----------------------')
          console.log(res)
        }).catch(err => {
          console.log(err ? '错误2' : '错误2')
        })
      })
    }
  }).catch(err => {
    console.log(err ? '错误1' : '错误1')
  })
}

// 快手h5获取信息
function kuaiShouH5GetDataReal (photoId) {
  return new Promise((resolve, reject) => {
    const kuaiShouH5PhotoInfoUrl = 'https://m.gifshow.com/rest/wd/photo/info?kpn=undefined&captchaToken='
    const params = {
      env: 'SHARE_VIEWER_ENV_TX_TRICK',
      h5Domain: 'm.gifshow.com',
      isLongVideo: false,
      photoId: photoId
    }
    axios.post(kuaiShouH5PhotoInfoUrl, params).then(res => {
      console.log('-------------------------1:请求h5数据----------------------')
      if (res.data) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

// 快手验证码校验
function kuaiShouVerifyCaptcha (url, captchaSession, pathname) {
  return new Promise((resolve, reject) => {
    const searchForm = new URLSearchParams()
    searchForm.append('captchaSession', captchaSession)
    axios({
      url: url,
      method: 'post',
      headers: {
        'Connection': 'keep-alive',
        // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Content-Type': 'application/json;charset=UTF-8',
        // 'Accept': '*/*',
        // 'Origin': 'https://m.gifshow.com',
        'Referer': pathname,
        // 'Accept-Language': 'zh-CN,zh;q=0.9',
      },
      timeout: 15000,
      data: searchForm,
      // withCredentials: true
    }).then(res => {
      console.log('-------------------------2:获取验证码----------------------')
      if (res.data) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
// 处理url
function dealUrl (url) {
  const pathname = url.split('?')[0]
  const pathnameArr = pathname.split('/')
  const len = pathnameArr.length
  const photoId = pathnameArr[len - 1]
  return { pathname, photoId }
}

// 计算captcha距离
function getCaptchaAttr (data) {
  const { disY, disX } = data
  // 根据系列的图像算法 找到图片缺口的正确位置 距离边缘的距离
  let x = 200
  let y = 100
  // 页面缩放 原始(686, 400)，实际 316 × 184 px
  const originSize = 686
  const realSize = 316
  // 下载下来的图片大小和网页上的比例不一样 算出比例来
  const scaleRatio = realSize / originSize
  // 主要算x，y需要进行比例缩放
  x = Math.floor(x * scaleRatio)
  y = Math.floor(disY * scaleRatio)
  // 然后再对x进行准确的计算 因为滑块开始 前面有部分边边 需要去除掉算起始位置到结束位置的距离
  const distance = Math.floor(((x - disX * scaleRatio)) / (realSize - 40) * 1000)
  const result = { x, y, scaleRatio, distance, originSize, realSize }
  Object.assign(result, data)
  return result
}

// 伪造滑动轨迹
function createSlideTrack (offset, startTime, x) {
  function sigmoid(d, t, cost = 2000) {
    function g(t) {
      return Math.abs(1 / Math.exp(-3.5 * t / cost))
    }
    return d * (g(t) / g(cost))
  }
  let distance = 0
  let cur = startTime
  // 首次
  let curY = Util.getRandomInt(15, 30)
  let ans = [[3, curY, 0]]
  while (distance < offset) {
    cur += Util.getRandomInt(15, 30)
    x = Math.floor(sigmoid(offset, (cur - startTime)))
    if (x > offset) {
      x = offset
    }
    const randomArr = [-1, 0, 1, 0, 0, 0]
    curY += randomArr[Math.floor((Math.random() * randomArr.length))]
    distance = x
    ans.push([Math.floor(x), curY, cur - startTime])
  }
  const trackData = (ans.map(li => { return li.join('|') })).join(',')
  return trackData
}

// 浏览器指纹信息加密
function getExtraParam () {
  const yc = {
    'userAgent': 'ua',
    'webDriver': 'riskBrowser',
    'webDriverDeep': 'exactRiskBrowser',
    'webDriverDeep2': 'exactRiskBrowser2',
    'canvasGraph': 'canvasGraphFingerPrint',
    'canvasTextEn': 'canvasTextFingerPrintEn',
    'canvasTextZh': 'canvasTextFingerPrintZh',
    'webglGraph': 'webglGraphFingerPrint',
    'webglGpu': 'webglGPUFingerPrint',
    'fontListEn': 'cssFontFingerPrintEn',
    'fontListZh': 'cssFontFingerPrintZh',
    'audioTriangle': 'voiceFingerPrint'
  }
  function ec (n) {
    const t = n['error']
    const e = n['version']
    const r = n['info']
    if (r) {
      return `${e}${getMurmurHash3(r)}`
    } else {
      return `E${e}${getMurmurHash3(t || 'UNKNOWN')}`
    }
  }
  function ed (n) {
    const t = n['name']
    const e = n['info']
    const r = n['simple']
    return {
      name: t,
      hash: r ? e : ec(n)
    }
  }
  const newCaptchaExtraParam = currentFingerprint.map(li => { return ed(li) })
  const dictExtraParam = {}
  for (let i = 0; i < newCaptchaExtraParam.length; i++) {
    const item = newCaptchaExtraParam[i]
    if (yc[item['name']]) {
      dictExtraParam[yc[item['name']]] = item['hash']
    }
    dictExtraParam[item['name']] = item['hash']
  }
  return dictExtraParam
}

// 计算murmurhash3
function getMurmurHash3 (str) {
  return murmurHash3.x64.hash128(str)
}

// 获取captchaToken
function getCaptchaToken (ciphertext, pathname) {
  return new Promise((resolve, reject) => {
    const captchaApiUrl = 'https://captcha.zt.kuaishou.com/rest/zt/captcha/sliding/kSecretApiVerify'
    const paraJson = {
      verifyParam: ciphertext
    }
    axios({
      url: captchaApiUrl,
      method: 'post',
      headers: {
        // 'Connection': 'keep-alive',
        // 'Origin': 'https://captcha.zt.kuaishou.com',
        'Content-Type': 'application/json',
        'Referer': pathname
      },
      timeout: 15000,
      data: JSON.stringify(paraJson)
    }).then(res => {
      console.log('-------------------------3:获取captchaToken----------------------')
      console.log(res)
      if (res.data) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}