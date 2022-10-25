const Util = require('../Util')
const Api = require('@/utils/api')
function getPageData () {
  return new Promise((resolve, reject) => {
    const operationName = 'visionSearchPhoto'
    const query = 'fragment photoContent on PhotoEntity {\n  id\n  duration\n  caption\n  originCaption\n  likeCount\n  viewCount\n  realLikeCount\n  coverUrl\n  photoUrl\n  photoH265Url\n  manifest\n  manifestH265\n  videoResource\n  coverUrls {\n    url\n    __typename\n  }\n  timestamp\n  expTag\n  animatedCoverUrl\n  distance\n  videoRatio\n  liked\n  stereoType\n  profileUserTopPhoto\n  musicBlocked\n  __typename\n}\n\nfragment feedContent on Feed {\n  type\n  author {\n    id\n    name\n    headerUrl\n    following\n    headerUrls {\n      url\n      __typename\n    }\n    __typename\n  }\n  photo {\n    ...photoContent\n    __typename\n  }\n  canAddComment\n  llsid\n  status\n  currentPcursor\n  tags {\n    type\n    name\n    __typename\n  }\n  __typename\n}\n\nquery visionSearchPhoto($keyword: String, $pcursor: String, $searchSessionId: String, $page: String, $webPageArea: String) {\n  visionSearchPhoto(keyword: $keyword, pcursor: $pcursor, searchSessionId: $searchSessionId, page: $page, webPageArea: $webPageArea) {\n    result\n    llsid\n    webPageArea\n    feeds {\n      ...feedContent\n      __typename\n    }\n    searchSessionId\n    pcursor\n    aladdinBanner {\n      imgUrl\n      link\n      __typename\n    }\n    __typename\n  }\n}\n'
    const queryObj = Util.getQuery(decodeURI(location.href))
    const authorName = document.querySelector('.profile-user-name-title').innerHTML.trim()
    const variables = {
      keyword: queryObj.searchKey,
      page: 'detail',
      pcursor: '',
      webPageArea: 'searchxxnull'
    }
    const params = {
      operationName,
      query,
      variables
    }
    Api.kuaiShouGraphql(params).then(res => {
      const { visionSearchPhoto } = res.data
      const dealData = parseData(visionSearchPhoto.feeds, authorName)
      resolve(dealData)
    }).catch(err => {
      reject(err)
    })
  })
}
function parseData (feeds, authorName) {
  let data = {}
  for (let i = 0; i < feeds.length; i++) {
    const { author, photo } = feeds[i]
    if (author.name === authorName) {
      data = {
        author,
        photo
      }
      break
    }
  }
  return data
}
const kuaiShouData = {
  getPageData
}
module.exports = kuaiShouData