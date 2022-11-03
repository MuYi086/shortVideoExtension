// const GlobalApi = require('@/api')
const btnAlert = require('@/platform/btnFn/btnAlert')
function btnSubmit () {
  $('#btn-wrapper .btn-submit').click(function () {
    const sid = $('#monitor .selectpicker').val()
    if (!sid) {
      btnAlert('danger', '请选择一个ip名称')
      return false
    }
    const params = {
      sid: sid,
      ids: '', // 作品唯一标识
      name: '', // 作品名称
      platform: '', // 平台名称
      title: '', // 标题
      url: '', // 侵权链接
      userId: '', // 分配id
      publishDate: '', // 发布时间
      author: '', // 侵权作者
      authorLink: '', // 作者主页链接
      timeSpan: '' // 视频时长/秒
    }
    console.log(params)
    console.log(window.h5DetailData)
    // GlobalApi.login(params).then(res => {
    //   if (res.data) {
    //     btnAlert('success', '提交成功')
    //   } else {
    //     btnAlert('danger', res.msg)
    //   }
    // })
  })
}
module.exports = btnSubmit