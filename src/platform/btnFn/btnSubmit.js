const GlobalApi = require('@/api')
const Util = require('@/utils/Util')
const btnAlert = require('@/platform/btnFn/btnAlert')
function btnSubmit () {
  $('#btn-wrapper .btn-submit-tort').click(function () {
    if (checkBeforeSubmit()) {
      const params = constructParams()
      params.auditStatus = 1
      excuteTortNormal(params)
    }
  })
  $('#btn-wrapper .btn-submit-normal').click(function () {
    if (checkBeforeSubmit()) {
      const params = constructParams()
      params.auditStatus = 2
      excuteTortNormal(params)
    }
  })
}
function checkBeforeSubmit () {
  const selectNameArr = $('#monitor .selectpicker').val()
  if (selectNameArr.length === 0) {
    btnAlert('danger', '请选择一个ip名称')
    return false
  } else {
    return true
  }
}
function constructParams () {
  const selectNameArr = $('#monitor .selectpicker').val()
  const { userName, kwaiId, userLink, caption, videoUrl, durationStr, publishDate } = window.h5DetailData
  const params = {
    // id: '', // 作品唯一标识
    name: selectNameArr.join(','), // 作品名称
    platform: Util.judgeWebType(), // 平台名称
    title: caption, // 标题
    url: videoUrl, // 侵权链接
    // userId: '', // 分配id
    publishDate: publishDate, // 发布时间
    author: userName, // 侵权作者
    authorId: kwaiId, // 作者id
    authorLink: userLink, // 作者主页链接
    timeSpan: durationStr, // 视频时长/秒
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