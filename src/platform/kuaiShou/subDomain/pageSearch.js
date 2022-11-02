const Util = require('@/utils/Util')
const Api = require('../api')
const pageSearch = {
  init: function () {
    this.searchSessionId = ''
    this.count = 0
    this.getData()
    this.scrollEvent()
    this.monitorSearchInput()
  },
  getData () {
    const that = this
    $('.search-button').click(function () {
      // 防止给页面过滤数据时页面还未渲染完成，加个延时
      setTimeout(that.searchData.bind(that), 1000)
    })
  },
  reset () {
    this.searchSessionId = ''
    this.count = 0
  },
  searchData (isAddSearchSessionId = false) {
    const that = this
    that.count++
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
    // 二次查询是否追加searchSessionId
    if (isAddSearchSessionId) {
      params.variables.pcursor = '1'
      params.variables.searchSessionId = this.searchSessionId
    }
    Api.kuaiShouGraphql(params).then(res => {
      const feedsList = that.dealFeeds(res.data.visionSearchPhoto.feeds)
      that.searchSessionId = res.data.visionSearchPhoto.searchSessionId
      that.addModifyBtn(feedsList)
    }).catch(err => {
      console.log(err)
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
      newFeeds.push({ href, caption: photo.caption })
    }
    return newFeeds
  },
  // 给视频栏增加自定义按钮
  addModifyBtn (feeds) {
    $.each($('.video-container .video-card '), function (index , item) {
      // 已经生成，就不二次生成了
      if (!$(item).find('.video-info-content').find('.to-h5')[0]) {
        const videoInfoTitle = $(item).find('.video-info-title').text().trim()
        let h5Href = ''
        for (let i = 0; i < feeds.length; i++) {
          const { href, caption } = feeds[i]
          // 去除超链接@标记
          const caption1 = caption.replace(/\(O3\w*\)/ig, '')
          // 去除首尾空格
          const caption2 = Util.trimSpace(caption1)
          if (videoInfoTitle == caption2) {
            h5Href = href
            break
          }
        }
        if (h5Href) {
          const insertDom = `<a href="${h5Href}" class="to-h5" target="_blank">跳转</a>`
          $(item).find('.video-info-content').append(insertDom)
        }
      }
    })
  },
  scrollEvent () {
    const that = this
    window.onscroll = function () {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const { windowH } = Util.getWindowHeightWidth()
      if (that.count === 1 && (scrollTop > windowH * 0.4)) {
        that.searchData(true)
      }
    }
  },
  monitorSearchInput () {
    const that = this
    $('.search-input').focus(function () {
      that.reset()
    })
  }
}
module.exports = pageSearch