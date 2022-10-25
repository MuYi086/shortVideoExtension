// const Util = require('../Util')
// const Api = require('@/utils/api')
function getPageData () {
  return new Promise((resolve, reject) => {
    const pathnameArr = decodeURI(location.pathname).split('/')
    const len = pathnameArr.length
    const photoId = pathnameArr[len - 1]
    const params = {
      env: '',
      h5Domain: 'm.gifshow.com',
      isLongVideo: false,
      photoId: photoId
    }
    chrome.runtime.sendMessage({apiName: 'kuaiShouWdPhotoInfo', params}, res => {
      console.log(res, '获取background-data')
      if (res.data.result !== 2001) {
        resolve(res)
      } else {
        reject(res)
      }
    })
  })
}
// function dealData (photo, photoId) {
//   const { search } = location
//   const { searchKey } = Util.getQuery(decodeURI(location.href))
//   const { caption, duration, likeCount, userEid, kwaiId, userName, viewCount } = photo
//   const durationStr = Util.mSecondSTrans(duration)
//   const userLink = `https://www.kuaishou.com/profile/${userEid}`
//   const videoUrl = `https://www.kuaishou.com/short-video/${photoId}${decodeURI(search)}`
//   return {
//     userName,
//     kwaiId,
//     userLink,
//     searchKey,
//     caption,
//     videoUrl,
//     durationStr,
//     likeCount,
//     viewCount
//   }
// }
const kuaiShouDataH5 = {
  getPageData
}
module.exports = kuaiShouDataH5