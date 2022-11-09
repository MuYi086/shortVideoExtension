/* eslint-disable */
const Util = require('@/utils/Util')
const Api = require('../api')
const GlobalApi = require('@/api/index')
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
      const selectNameArr = $('#monitor .selectpicker').val()
      if (selectNameArr.length <= 0) {
        btnAlert('danger', '请于插件下拉框选择作品名称')
        return false
      }
      const params = {
        name: selectNameArr.join(','),
        platform: Util.judgeWebType(),
        auditStatus: 0, // 审核状态: 0未审核；1审核侵权；2不侵权;3审核中
        source: 1, // 来源表: 0监测表；1 插件
        plugList: that.constructCollectArr()
      }
      console.log(params)
      GlobalApi.monitorWorkResultAuditPlug(params).then(res => {
        if (res) {
          console.log(res)
          btnAlert('success', '收藏成功')
        }
      }).catch(err => {
        console.log(err)
      })
    })
  },
  getData () {
    const that = this
    // 创建批量收藏按钮
    setTimeout(this.createCollectBtn.bind(that), 1500)
    // 监听videoContainer
    setTimeout(that.watchVideoContainer.bind(that), 1500)
    // 防止给页面过滤数据时页面还未渲染完成，加个延时
    setTimeout(that.addFeedsList.bind(that), 1500)
  },
  reset () {
    this.count = 0
    this.feedsList = []
    this.pcursor = ''
  },
  addFeedsList (isAddSearchPcursor = false) {
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
    }).catch(err => {
      console.log(err)
    })
  },
  // 处理feeds
  dealFeeds (feeds) {
    const newFeeds = []
    for (let i = 0; i < feeds.length; i++) {
      const { author, photo } = feeds[i]
      const { name } = author
      const { id, caption, duration, timestamp, coverUrl } = photo
      const origin = 'https://m.gifshow.com'
      const pcOrigin = 'https://www.kuaishou.com'
      const pathname = `/fw/photo/${id}`
      const pcPathname = `/short-video/${id}`
      const h5Href = `${origin}${pathname}`
      const pcHref = `${pcOrigin}${pcPathname}`
      const durationStr = Math.floor(duration / 1000)
      const captionStr = Util.kuaiShouCaptionDeal(caption)
      const publishDate = Util.formatDate(new Date(timestamp), 'yyyy-MM-dd hh:mm:ss')
      const authorLink = decodeURI(`https://www.kuaishou.com/profile/${author.id}`)
      newFeeds.push({
        timeSpan: durationStr,
        title: captionStr,
        url: pcHref,
        h5Href: h5Href,
        publishDate: publishDate,
        authorLink: authorLink,
        author: name,
        coverUrl: coverUrl
      })
    }
    return newFeeds
  },
  watchVideoContainer () {
    const that = this
    Util.domWatch(document.querySelector('.user-photo-list'), function () {
      if (that.count >= 1) {
        that.addFeedsList(true)
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
      const ablePhotoArr = that.addJumpBtn(srcDomArr)
      if (ablePhotoArr.length > 0) {
        that.getUrlCheckList(ablePhotoArr).then(urlCheckList => {
          that.addVerifyBtn(urlCheckList, srcDomArr)
        })
      }
    }, 500)
  },
  addJumpBtn (srcDomArr) {
    const ablePhotoArr = []
    // 比对feedslist中已有的数据,找出封面图所在的photo信息
    for (let m = 0; m < srcDomArr.length; m++) {
      let photo = {}
      const sda = srcDomArr[m]
      // 如果已经添加跳转按钮，跳过
      if ($(sda).parents('.video-card').find('.video-info-content').find('.to-h5').length > 0) {
        continue
      }
      for (let n = 0; n < this.feedsList.length; n++) {
        const fdl = this.feedsList[n]
        if (Util.dealKuaiShouImgSrc(sda.src) === Util.dealKuaiShouImgSrc(fdl.coverUrl)) {
          photo = fdl
          ablePhotoArr.push(fdl)
          $(sda).attr('data-fdl', JSON.stringify(fdl))
          break
        }
      }
      if (photo.url) {
        const insertDom = `<a href="${photo.h5Href}" data-pchref="${photo.url}" class="to-h5" target="_blank">跳转</a>`
        $(sda).parents('.video-card').find('.video-info-content').prepend(insertDom)
      }
    }
    return ablePhotoArr
  },
  addVerifyBtn (urlCheckList, srcDomArr) {
    // 遍历srcDomArr,给未有审核和收藏状态的图集添加状态
    for (let m = 0; m < srcDomArr.length; m++) {
      const sda = srcDomArr[m]
      // 如果已经添加审核按钮，跳过
      if ($(sda).parents('.video-card').find('.video-info-content').find('.to-verify').length > 0) {
        continue
      }
      // 添加多选框
      if ($(sda).parents('.video-card-main').find('.img-check').length <= 0) {
        $(sda).parents('.video-card-main').append(`<input class="img-check check-${m}" type="checkbox">`)
      }
      const fdlStr = sda.dataset['fdl']
      const { url } = JSON.parse(fdlStr)
      let verifyDom = ''
      for (let n = 0; n < urlCheckList.length; n++) {
        const ucl = urlCheckList[n]
        if (ucl.url === url) {
          // 构造审核btn
          verifyDom = `<span class="to-verify ${ucl.check ? 'verifyed' : ''}">${ucl.check ? '已审核' : '未审核'}</span>`
          // 勾选框回显
          $(sda).parents('.video-card-main').find(`.img-check.check-${m}`).prop('checked', ucl.collect)
          break
        }
      }
      $(sda).parents('.video-card').find('.video-info-content .like-icon').before(verifyDom)
    }
  },
  getUrlCheckList (ablePhotoArr) {
    const that = this
    // const pathnameArr = location.pathname.split('/')
    // const author = pathnameArr[pathnameArr.length - 1]
    return new Promise((resolve, reject) => {
      const params = {
        author: $('.user-detail .user-name span').text().trim(),
        urlList: ablePhotoArr.map(li => { 
          return li.url
         })
      }
      Api.monitorWorkResultAuditUrlCheck(params).then(res => {
        if (res.data && res.data.data) {
          resolve(res.data.data)
        } else {
          btnAlert('danger', res.data.msg)
          resolve([])
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  constructCollectArr () {
    const arr = []
    $.each($('.user-photo-list .video-card'), function (index , item) {
      if ($(item).find('.img-check').prop('checked')) {
        const fdlStr = $(item).find('.poster-img')[0].dataset['fdl']
        if (fdlStr) {
          const { timeSpan, title, url, publishDate, authorLink, author } = JSON.parse(fdlStr)
          const authorId = ''
          arr.push({ timeSpan, title, url, publishDate, authorLink, author, authorId })
        }
      }
    })
    return arr
  }
}
eventEmitter.on('kuaishou-profile', pageProfile.scrollEnd.bind(pageProfile))
module.exports = pageProfile