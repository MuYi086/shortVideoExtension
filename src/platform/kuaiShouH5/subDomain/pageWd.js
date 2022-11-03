const dataPreview = require('@/platform/render/dataPreview')
const Util = require('@/utils/Util')
const Api = require('../api')
const pageWd = {
  init: function () {
    this.getData().then(data => {
      dataPreview(data)
    })
  },
  // 发起请求
  getData () {
    return new Promise((resolve, reject) => {
      const { photoId }= Util.getPhotoIdByKuaiShouUrl(location.href)
      const params = {
        env: 'SHARE_VIEWER_ENV_TX_TRICK',
        h5Domain: 'm.gifshow.com',
        isLongVideo: false,
        photoId: photoId
      }
      Api.kuaiShouH5PhotoInfo(params).then(res => {
        const { search } = location
        const queryObj = Util.getQuery(search)
        const { userName, kwaiId, userEid, caption, duration, likeCount, viewCount, timestamp } = res.data.photo
        const userLink = decodeURI(`https://www.kuaishou.com/profile/${userEid}`)
        const searchKey = decodeURI(queryObj.searchKey)
        const videoUrl = decodeURI(`https://www.kuaishou.com/short-video/${photoId}${search}`)
        const durationStr = Util.mSecondSTrans(duration)
        const publishDate = Util.formatDate(new Date(timestamp), 'yyyy-MM-dd hh:mm:ss')
        const h5DetailData = { userName, kwaiId, userLink, caption, searchKey, videoUrl, durationStr, likeCount, viewCount, publishDate }
        window['h5DetailData'] = h5DetailData
        resolve(h5DetailData)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
module.exports = pageWd