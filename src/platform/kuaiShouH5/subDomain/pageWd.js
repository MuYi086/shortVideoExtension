// const $ = require('jquery')
const Util = require('@/utils/Util')
const Api = require('../api')
const renderData = require('../../common/renderData')
const pageWd = {
  init: function () {
    // const that = this
    this.getData().then(data => {
      renderData(data)
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
        const { userName, kwaiId, userEid, caption, duration, likeCount, viewCount } = res.photo
        const userLink = `https://www.kuaishou.com/profile/${userEid}`
        const searchKey = decodeURI(queryObj.searchKey)
        const videoUrl = `https://www.kuaishou.com/short-video/${photoId}${search}`
        const durationStr = Util.mSecondSTrans(duration)
        const groupData = { userName, kwaiId, userLink, caption, searchKey, videoUrl, durationStr, likeCount, viewCount }
        resolve(groupData)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
module.exports = pageWd