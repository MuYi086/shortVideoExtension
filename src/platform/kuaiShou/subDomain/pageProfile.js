const Util = require('@/utils/Util')
const Api = require('../api')
const btnAlert = require('@/platform/btnFn/btnAlert')
const pageProfile = {
  init: function () {
    const pathnameArr = location.pathname.split('/')
    this.userId = pathnameArr[pathnameArr.length - 1]
    this.count = 0
    this.isInLoading = false
    this.feedsList = []
    this.pcursor = ''
    this.getData()
  },
  getData () {
    const that = this
    setTimeout(that.watchVideoContainer.bind(that), 1000)
    // 防止给页面过滤数据时页面还未渲染完成，加个延时
    setTimeout(that.constructJumpUrl.bind(that), 1500)
  },
  reset () {
    this.count = 0
    this.isInLoading = false
    this.feedsList = []
    this.pcursor = ''
  },
  constructJumpUrl (isAddSearchPcursor = false) {
    const that = this
    this.isInLoading = true
    that.count += 1
    const queryObj = Util.getQuery(location.search)
    that.keyword = decodeURI(queryObj.searchKey)
    const params = {
      operationName: 'visionProfilePhotoList',
      query: 'fragment photoContent on PhotoEntity {\n id\n duration\n caption\n originCaption\n likeCount\n viewCount\n realLikeCount\n coverUrl\n photoUrl\n photoH265Url\n manifest\n manifestH265\n videoResource\n coverUrls {\n url\n __typename\n }\n timestamp\n expTag\n animatedCoverUrl\n distance\n videoRatio\n liked\n stereoType\n profileUserTopPhoto\n musicBlocked\n __typename\n}\n\nfragment feedContent on Feed {\n type\n author {\n id\n name\n headerUrl\n following\n headerUrls {\n url\n __typename\n }\n __typename\n }\n photo {\n ...photoContent\n __typename\n }\n canAddComment\n llsid\n status\n currentPcursor\n tags {\n type\n name\n __typename\n }\n __typename\n}\n\nquery visionProfilePhotoList($pcursor: String, $userId: String, $page: String, $webPageArea: String) {\n visionProfilePhotoList(pcursor: $pcursor, userId: $userId, page: $page, webPageArea: $webPageArea) {\n result\n llsid\n webPageArea\n feeds {\n ...feedContent\n __typename\n }\n hostName\n pcursor\n __typename\n }\n}\n',
      variables: {
        page: 'profile',
        pcursor: '',
        userId: this.userId
      }
    }
    // 二次查询是否追加pcursor
    if (isAddSearchPcursor) {
      params.variables.pcursor = `${this.count - 1}`
    }
    Api.kuaiShouGraphql(params).then(res => {
      const { visionProfilePhotoList } = res.data.data
      that.feedsList = [...that.feedsList, ...that.dealFeeds(visionProfilePhotoList.feeds)]
      that.pcursor = visionProfilePhotoList.pcursor
      that.addModifyBtn()
      that.isInLoading = false
    }).catch(err => {
      that.isInLoading = false
      console.log(err)
    })
  },
  // 处理feeds
  dealFeeds (feeds) {
    const newFeeds = []
    for (let i = 0; i < feeds.length; i++) {
      const { photo } = feeds[i]
      const origin = 'https://m.gifshow.com'
      const pcOrigin = 'https://www.kuaishou.com'
      const pathname = `/fw/photo/${photo.id}`
      const pcPathname = `/short-video/${photo.id}`
      const href = `${origin}${pathname}`
      const pcHref = `${pcOrigin}${pcPathname}`
      const durationStr = Math.floor(photo.duration / 1000)
      const caption = Util.kuaiShouCaptionDeal(photo.caption)
      newFeeds.push({ href, pcHref: pcHref, caption: caption, coverUrl: photo.coverUrl, duration: durationStr })
    }
    return newFeeds
  },
  // 给视频栏增加自定义按钮
  addModifyBtn () {
    const lenStart = this.count >= 2 ? (this.count - 2) * 20 : 0
    const lenEnd = this.count >= 2 ? (this.count - 1) * 20 : 0
    const feeds = this.feedsList.slice(lenStart, lenEnd)
    console.log(this.count, feeds)
    return false
    // $.each($('.user-photo-list .video-card '), function (index , item) {
    //   // 已经生成，就不二次生成了
    //   if (!$(item).find('.video-info-content').find('.to-h5')[0]) {
    //     let h5Href = ''
    //     let pcUrl = ''
    //     const imgCover = $(item).find('.poster-img').attr('src')
    //     const imgCoverDeald = Util.dealKuaiShouImgSrc(imgCover)
    //     for (let i = 0; i < feeds.length; i++) {
    //       const { href, pcHref, coverUrl } = feeds[i]
    //       const coverUrlDeald = Util.dealKuaiShouImgSrc(coverUrl)
    //       console.log(imgCoverDeald)
    //       console.log(coverUrlDeald)
    //       if (imgCoverDeald == coverUrlDeald) {
    //         h5Href = href
    //         pcUrl = pcHref
    //         console.log('打印俩者链接', '-------------------------attr----------------------')
    //         break
    //       }
    //     }
    //     if (h5Href) {
    //       const insertDom = `<a href="${h5Href}" data-pchref="${pcUrl}" class="to-h5" target="_blank">跳转</a>`
    //       $(item).find('.video-info-content').prepend(insertDom)
    //     }
    //   }
    // })
    // // 更新审核结果
    // this.constructVerifyResult(feeds)
  },
  constructVerifyResult (list) {
    const that = this
    const params = {
      data: list.map(li => { return li.pcHref })
    }
    Api.monitorWorkResultAuditUrlCheck(params).then(res => {
      if (res.data && res.data.data) {
        that.addVerifyBtn(res.data.data)
      } else {
        btnAlert('danger', res.data.msg)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 给视频栏增加是否审核状态
  addVerifyBtn (feeds) {
    $.each($('.video-container .video-card '), function (index , item) {
      // 已经生成，就不二次生成了
      if (!$(item).find('.video-info-content').find('.to-verify')[0]) {
        const videoInfoContent = $(item).find('.video-info-content')
        const pcHref = videoInfoContent.find('.to-h5').attr('data-pchref')
        let verifyDom = ''
        for (let i = 0; i < feeds.length; i++) {
          const fdLi = feeds[i]
          if (pcHref === fdLi.url) {
            verifyDom = `<span class="to-verify ${fdLi.check ? 'verifyed' : ''}">${fdLi.check ? '已审核' : '未审核'}</span>`
            break
          }
        }
        videoInfoContent.prepend(verifyDom)
      }
    })
  },
  watchVideoContainer () {
    const that = this
    Util.domWatch(document.querySelector('.user-photo-list'), function () {
      setTimeout(() => {
        if (that.count >= 1) {
          that.constructJumpUrl(true)
        }
      }, 1500)
    })
  }
}
module.exports = pageProfile