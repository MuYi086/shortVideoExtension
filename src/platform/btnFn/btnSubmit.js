const GlobalApi = require('@/api')
const Util = require('@/utils/Util')
const btnAlert = require('@/platform/btnFn/btnAlert')
const selectpickerCheck = require('@/platform/common/selectpickerCheck')
function btnSubmit () {
  $('#btn-wrapper .btn-submit-tort').click(function () {
    if (!selectpickerCheck()) {
      return false
    }
    const params = constructParams()
    params.auditStatus = 1
    excuteTortNormal(params)
  })
  $('#btn-wrapper .btn-submit-normal').click(function () {
    if (!selectpickerCheck()) {
      return false
    }
    const params = constructParams()
    params.auditStatus = 2
    excuteTortNormal(params)
  })
}
function constructParams () {
  const selectNameArr = $('#monitor .selectpicker').val()
  const { userName, kwaiId, userLink, caption, videoUrl, durationStr, publishDate } = window.h5DetailData
  const params = {
    // id: '', // 作品唯一标识
    name: selectNameArr.join(','), // 作品名称
    platform: Util.judgeWebType() === '快手H5' ? '快手' : Util.judgeWebType(), // 平台名称
    source: 1, // 0:监测表;1:插件
    plugList: [
      {
        timeSpan: durationStr, // 视频时长/秒
        title: caption, // 标题
        url: videoUrl, // 侵权链接
        publishDate: publishDate, // 发布时间
        authorLink: userLink, // 作者主页链接
        author: userName, // 侵权作者
        authorId: kwaiId // 作者id
      }
    ]
  }
  return params
}
function excuteTortNormal (params) {
  GlobalApi.monitorWorkResultAuditPlug(params).then(res => {
    if (res.data.code === 200) {
      btnAlert('success', '提交成功')
    } else {
      btnAlert('danger', res.data.msg)
    }
  })
}
module.exports = btnSubmit