/* eslint-disable */
const Util = require('@/utils/Util')
const Api = require('../api')
const btnAlert = require('@/platform/btnFn/btnAlert')
const pageProfile = {
  init: function () {
    const pathnameArr = location.pathname.split('/')
    this.userId = pathnameArr[pathnameArr.length - 1]
    this.count = 0
    this.feedsList = []
    this.pcursor = ''
    this.getData()
  },
  createCollectBtn () {
    const that = this
    const collectHtml = `<div class="collect-wrap"><button type="button" class="btn btn-primary btn-collect btn-xs">批量收藏</button></div>`
    $('body').append(collectHtml)
    $('.collect-wrap .btn-collect').click(function () {
      const arr = that.constructCollectArr()
      console.log(arr)
    })
  },
  getData () {
    const that = this
    // 创建批量收藏按钮
    setTimeout(this.createCollectBtn.bind(that), 1500)
    // 监听videoContainer
    setTimeout(that.watchVideoContainer.bind(that), 1500)
    // 防止给页面过滤数据时页面还未渲染完成，加个延时
    setTimeout(that.constructJumpUrl.bind(that), 1500)
  },
  reset () {
    this.count = 0
    this.feedsList = []
    this.pcursor = ''
  },
  constructJumpUrl (isAddSearchPcursor = false) {
    const that = this
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
      params.variables.pcursor = that.pcursor
    }
    Api.kuaiShouGraphql(params).then(res => {
      const { visionProfilePhotoList } = res.data.data
      that.feedsList = [...that.feedsList, ...that.dealFeeds(visionProfilePhotoList.feeds)]
      that.pcursor = visionProfilePhotoList.pcursor
      console.log(that.feedsList)
    }).catch(err => {
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
  watchVideoContainer () {
    const that = this
    Util.domWatch(document.querySelector('.user-photo-list'), function () {
      if (that.count >= 1) {
        that.constructJumpUrl(true)
      }
    })
  },
  scrollEnd () {
    const that = this
    console.log('滚动结束了')
    setTimeout(() => {
      const posterDomArr = Array.from(document.querySelectorAll('.poster-img'))
      // 找出有真实src的图集
      const srcDomArr = posterDomArr.filter((li => {
        const uniqueKey = Util.randomUniqueKey()
        if (!li.akKey) li.akKey = uniqueKey
        if (li.src.includes('upic')) return li
      }))
      that.addJumpBtn(srcDomArr)
    }, 1000)
  },
  addJumpBtn (srcDomArr) {
    // 比对feedslist中已有的数据,找出封面图所在的photo信息
    for (let m = 0; m < srcDomArr.length; m++) {
      let photo = {}
      const sda = srcDomArr[m]
      // 添加多选框
      if ($(sda).parents('.video-card-main').find('.img-check').length <= 0) {
        $(sda).parents('.video-card-main').append(`<input class="img-check check-${m}" type="checkbox">`)
      }
      // 如果已经添加跳转按钮，跳过
      if ($(sda).parents('.video-card').find('.video-info-content').find('.to-h5').length > 0) {
        continue
      }
      for (let n = 0; n < this.feedsList.length; n++) {
        const fdl = this.feedsList[n]
        if (Util.dealKuaiShouImgSrc(sda.src) === Util.dealKuaiShouImgSrc(fdl.coverUrl)) {
          photo = fdl
          $(sda).attr('data-fdl', JSON.stringify(fdl))
          break
        }
      }
      if (photo.href) {
        const insertDom = `<a href="${photo.href}" data-pchref="${photo.pcHref}" class="to-h5" target="_blank">跳转</a>`
        $(sda).parents('.video-card').find('.video-info-content').prepend(insertDom)
      }
    }
    console.log(srcDomArr)
  },
  addVerifyBtn (srcDomArr) {
    const that = this
    const params = {
      data: srcDomArr.map(li => { return li.pcHref })
    }
    Api.monitorWorkResultAuditUrlCollectList(params).then(res => {
      if (res.data && res.data.data) {
        console.log(res.data.data)
      } else {
        btnAlert('danger', res.data.msg)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  constructCollectArr () {
    const arr = []
    $.each($('.user-photo-list .video-card'), function (index , item) {
      if ($(item).find('.img-check').prop('checked')) {
        const fdlStr = $(item).find('.poster-img')[0].dataset['fdl']
        if (fdlStr) {
          const { pcHref, duration, caption } = JSON.parse(fdlStr)
          arr.push({ caption, duration, pcHref })
        }
      }
    })
    return arr
  }
}
eventEmitter.on('kuaishou-profile', pageProfile.scrollEnd.bind(pageProfile))
module.exports = pageProfile