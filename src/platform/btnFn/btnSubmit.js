const GlobalApi = require('@/api')
const Util = require('@/utils/Util')
const btnAlert = require('@/platform/btnFn/btnAlert')
function btnSubmit () {
  $('#btn-wrapper .btn-submit-tort').click(function () {
    const selectName = $('#monitor .selectpicker').val()
    if (!selectName) {
      btnAlert('danger', '请选择一个ip名称')
      return false
    }
    const { userName, kwaiId, userLink, caption, videoUrl, durationStr, publishDate } = window.h5DetailData
    const params = {
      // id: '', // 作品唯一标识
      name: selectName.join(','), // 作品名称
      platform: Util.judgeWebType(), // 平台名称
      title: caption, // 标题
      url: videoUrl, // 侵权链接
      // userId: '', // 分配id
      publishDate: publishDate, // 发布时间
      author: userName, // 侵权作者
      authorId: kwaiId, // 作者id
      authorLink: userLink, // 作者主页链接
      timeSpan: durationStr // 视频时长/秒
    }
    console.log(params)
    GlobalApi.monitorWorkResultAuditPlug(params).then(res => {
      console.log(res, '----------res---------')
      if (res.data) {
        btnAlert('success', '提交成功')
      } else {
        btnAlert('danger', res.msg)
      }
    })
  })
}
module.exports = btnSubmit