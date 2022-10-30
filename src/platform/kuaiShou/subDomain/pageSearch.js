const $ = require('jquery')
const Util = require('@/utils/Util')
const Api = require('../api')
const pageSearch = {
  init: function () {
    this.getData()
  },
  // 发起请求
  getData () {
    const that = this
    $('.search-button').click(function () {
      console.log('我点击了')
      const queryObj = Util.getQuery(location.search)
      that.keyword = decodeURI(queryObj.searchKey)
      const params = {
        operationName: 'visionSearchPhoto',
        query: 'fragment photoContent on PhotoEntity {\n  id\n  duration\n  caption\n  originCaption\n  likeCount\n  viewCount\n  realLikeCount\n  coverUrl\n  photoUrl\n  photoH265Url\n  manifest\n  manifestH265\n  videoResource\n  coverUrls {\n    url\n    __typename\n  }\n  timestamp\n  expTag\n  animatedCoverUrl\n  distance\n  videoRatio\n  liked\n  stereoType\n  profileUserTopPhoto\n  musicBlocked\n  __typename\n}\n\nfragment feedContent on Feed {\n  type\n  author {\n    id\n    name\n    headerUrl\n    following\n    headerUrls {\n      url\n      __typename\n    }\n    __typename\n  }\n  photo {\n    ...photoContent\n    __typename\n  }\n  canAddComment\n  llsid\n  status\n  currentPcursor\n  tags {\n    type\n    name\n    __typename\n  }\n  __typename\n}\n\nquery visionSearchPhoto($keyword: String, $pcursor: String, $searchSessionId: String, $page: String, $webPageArea: String) {\n  visionSearchPhoto(keyword: $keyword, pcursor: $pcursor, searchSessionId: $searchSessionId, page: $page, webPageArea: $webPageArea) {\n    result\n    llsid\n    webPageArea\n    feeds {\n      ...feedContent\n      __typename\n    }\n    searchSessionId\n    pcursor\n    aladdinBanner {\n      imgUrl\n      link\n      __typename\n    }\n    __typename\n  }\n}\n',
        variables: {
          keyword: that.keyword,
          page: 'search',
          pcursor: ''
        }
      }
      Api.kuaiShouGraphql(params).then(res => {
        console.log('-------------------------1:数据----------------------')
        const feedsList = that.dealFeeds(res.data.visionSearchPhoto.feeds)
        that.addModifyBtn(feedsList)
      }).catch(err => {
        console.log('-------------------------1:错误----------------------')
        console.log(err)
      })
    })
  },
  // 处理feeds
  dealFeeds (feeds) {
    const newFeeds = []
    for (let i = 0; i < feeds.length; i++) {
      const { author, photo } = feeds[i]
      const origin = 'https://m.gifshow.com'
      const pathname = `/fw/photo/${photo.id}`
      const search = `?authorId=${author.id}&streamSource=search&area=searchxxnull&searchKey=${this.keyword}`
      const href = `${origin}${pathname}${search}`
      newFeeds.push({ href, likeCount: photo.likeCount })
    }
    return newFeeds
  },
  // 给视频栏增加自定义按钮
  addModifyBtn (feeds) {
    console.log(feeds)
    $.each($('.video-container .video-card '), function (index , item) {
      const likeStr = $(item).find('.video-info-content .info-text').text()
      const dealLikeStr = likeStr.substr(0, likeStr.length - 2)
      let h5Href = ''
      for (let i = 0; i < feeds.length; i++) {
        const { href, likeCount } = feeds[i]
        if (dealLikeStr == likeCount) {
          h5Href = href
          break
        }
      }
      const insertDom = `<a href="${h5Href}" target="_blank">跳转</a>`
      $(item).find('.video-info-content').append(insertDom)
    })
  }
}
module.exports = pageSearch