/* eslint-disable */
const Util = require('@/utils/Util')
const Api = require('../api')
const GlobalApi = require('@/api/index')
const btnAlert = require('@/platform/btnFn/btnAlert')
const selectpickerCheckIp = require('@/platform/common/selectpickerCheckIp')
const selectpickerCheckProject = require('@/platform/common/selectpickerCheckProject')
const pageHashTag = {
  init: function () {
    this.count = 0
    this.feedsList = []
    this.searchSessionId = ''
    this.isInputStopTimes = 0
    this.getData()
  },
  createNotTortBtn () {
    const that = this
    $('.video-card .not-tort').click(function () {
      const selectNameArr = selectpickerCheckIp()
      if (!selectNameArr) return false
      const currentDom = $(this)
      that.setVideoNotTort(currentDom).then(h5Href => {
        btnAlert('success', '已审核')
        $(this).hide()
      })
    })
  },
  getData () {
    const that = this
    // 防止给页面过滤数据时页面还未渲染完成，加个延时
    setTimeout(that.addFeedsList.bind(that), 1500)
  },
  reset () {
    this.count = 0
    this.feedsList = []
    this.searchSessionId = ''
    this.isInputStopTimes = 1
  },
  addFeedsList (isAddSearchSessionId = false) {
    const that = this
    that.count += 1
    const pathname = decodeURI(location.pathname)
    const pathnameArr = pathname.split('/')
    that.keyword = pathnameArr[pathnameArr.length - 1]
    const params = {
      operationName: 'hashTagDataQuery',
      query: 'fragment photoContent on PhotoEntity {\n  id\n  duration\n  caption\n  originCaption\n  likeCount\n  viewCount\n  realLikeCount\n  coverUrl\n  photoUrl\n  photoH265Url\n  manifest\n  manifestH265\n  videoResource\n  coverUrls {\n    url\n    __typename\n  }\n  timestamp\n  expTag\n  animatedCoverUrl\n  distance\n  videoRatio\n  liked\n  stereoType\n  profileUserTopPhoto\n  musicBlocked\n  __typename\n}\n\nfragment feedContent on Feed {\n  type\n  author {\n    id\n    name\n    headerUrl\n    following\n    headerUrls {\n      url\n      __typename\n    }\n    __typename\n  }\n  photo {\n    ...photoContent\n    __typename\n  }\n  canAddComment\n  llsid\n  status\n  currentPcursor\n  tags {\n    type\n    name\n    __typename\n  }\n  __typename\n}\n\nquery hashTagDataQuery($tagName: String, $pcursor: String, $fromPhotoId: String, $page: String, $webPageArea: String) {\n  hashTagData(tagName: $tagName, pcursor: $pcursor, fromPhotoId: $fromPhotoId, page: $page, webPageArea: $webPageArea) {\n    result\n    llsid\n    pcursor\n    sessionId\n    webPageArea\n    feeds {\n      ...feedContent\n      __typename\n    }\n    __typename\n  }\n}\n',
      variables: {
        tagName: that.keyword,
        page: 'hashtag',
        pcursor: ''
      }
    }
    // 二次查询是否追加searchSessionId
    if (isAddSearchSessionId) {
      params.variables.pcursor = `${this.count - 1}`
      params.variables.searchSessionId = this.searchSessionId
    }
    Api.kuaiShouGraphql(params).then(res => {
      const { hashTagData } = res.data.data
      that.feedsList = [...that.feedsList, ...that.dealFeeds(hashTagData.feeds)]
      that.searchSessionId = hashTagData.searchSessionId
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
  scrollEnd () {
    const that = this
    setTimeout(() => {
      if (!selectpickerCheckProject()) return false
      if (!selectpickerCheckIp()) return false
      const posterDomArr = Array.from(document.querySelectorAll('.poster-img'))
      // 判断当前img条数和feedList长度,大于20时可以请求下一页了
      if (posterDomArr.length - that.feedsList.length >= 20) {
        that.addFeedsList(true)
      }
      // 找出有真实src的图集
      const srcDomArr = posterDomArr.filter((li => {
        const uniqueKey = Util.randomUniqueKey()
        if (!li.akKey) li.akKey = uniqueKey
        if (li.src.includes('upic')) return li
      }))
      const ablePhotoArr = that.addJumpBtn(srcDomArr)
      if (ablePhotoArr.length > 0) {
        that.getUrlCheckList(ablePhotoArr).then(urlCheckList => {
          that.unbindBtnEventAfterScroll()
          that.addVerifyBtn(urlCheckList, srcDomArr)
          that.createNotTortBtn()
          that.createJumpBtnEvent()
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
        const insertDom = `<button data-href="${photo.h5Href}" data-pchref="${photo.url}" type="button" class="to-h5 btn btn-primary btn-jump btn-xs">播放</button>`
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
      const fdlStr = sda.dataset['fdl']
      let fdlObj = null
      let url = ''
      if (fdlStr) {
        fdlObj = JSON.parse(fdlStr)
        url = fdlObj.url
      }
      let verifyDom = ''
      let currentUcl = null
      for (let n = 0; n < urlCheckList.length; n++) {
        const ucl = urlCheckList[n]
        if (ucl.url === url) {
          currentUcl = ucl
          // 构造审核btn
          if (ucl.auditStatus === 0) {
            verifyDom = `<button type="button" class="not-tort btn btn-success btn-xs">设为不侵权</button>`
          }
          break
        }
      }
      // 追加审核按钮
      $(sda).parents('.video-card').find('.video-info-content .like-icon').before(verifyDom)
      if (currentUcl) {
        // 追加审核状态提示
        this.createVerifyStatusTip($(sda), currentUcl)
        // 追加白名单提示
        this.createShortTimeTip($(sda), currentUcl)
      }
    }
  },
  getUrlCheckList (ablePhotoArr) {
    const that = this
    return new Promise((resolve, reject) => {
      const params = {
        projectId: Util.findSelectpickerProjectId(),
        name: selectpickerCheckIp().join(','),
        platform: Util.judgeWebType(),
        plugList: ablePhotoArr.map(li => {
          return { url: li.url, title: li.title, author: li.author, timeSpan: li.timeSpan, publishDate: li.publishDate }
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
  createJumpBtnEvent () {
    const that = this
    $('.video-info-content .to-h5').click(function () {
      const currentDom = $(this)
      that.setVideoNotTort(currentDom).then(h5Href => {
        currentDom.siblings('.not-tort').hide()
        Util.windowOpen(h5Href)
      })
    })
  },
  setVideoNotTort (currentDom) {
    return new Promise((resolve, reject) => {
      const selectNameArr = selectpickerCheckIp()
      if (!selectNameArr) return false
      const fdlStr = currentDom.parents('.video-card').find('.poster-img')[0].dataset['fdl']
      if (fdlStr) {
        const { timeSpan, title, url, publishDate, authorLink, author, h5Href } = JSON.parse(fdlStr)
        const params = {
          projectId: Util.findSelectpickerProjectId(),
          name: selectNameArr.join(','),
          platform: Util.judgeWebType(),
          auditStatus: 2, // 审核状态: 0未审核；1审核侵权；2不侵权;3审核中
          source: 1, // 来源表: 0监测表；1 插件
          plugList: [{ timeSpan, title, url, publishDate, authorLink, author }]
        }
        GlobalApi.monitorWorkResultAuditPlug(params).then(res => {
          if (res) {
            currentDom.parents('.video-card').find('.verify-false').show().siblings('.verify-true').hide().siblings('.not-verifyed').hide()
            resolve(h5Href)
          }
        }).catch(err => {
          reject(err)
        })
      }
    })
  },
  unbindBtnEventAfterScroll () {
    $('.video-info-content .to-h5').unbind()
    $('.video-info-content .not-tort').unbind()
  },
  createShortTimeTip (currentDom, currentUcl) {
    if (currentDom.siblings('.short-time').length <= 0) {
      const shortTimeHtml = Util.constructWhiteHtml(currentUcl)
      currentDom.after(shortTimeHtml)
    }
  },
  createVerifyStatusTip (currentDom, currentUcl) {
    if (currentDom.siblings('.verify-status').length <= 0) {
      const verifyStatusHtml = Util.constructVerifyHtml(currentUcl)
      currentDom.after(verifyStatusHtml)
    }
  }
}
function scrollEventBeaforeCheckToken () {
  Util.checkLogin().then(res => {
    if (res) {
      pageHashTag.scrollEnd.call(pageHashTag)
    } else {
      btnAlert('danger', '请登录')
    }
  })
}
eventEmitter.on('kuaishou-hashtag', scrollEventBeaforeCheckToken)
module.exports = pageHashTag