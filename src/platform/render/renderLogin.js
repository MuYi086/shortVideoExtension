const $ = require('jquery')
function renderLogin (cb) {
  // 获取login缓存
  const monitorWrap = '<div id="monitor">' +
  ' <div class="preview">' +
  '   <div class="line"><i>用户名：</i><input value="" /></div>' +
  '   <div class="line"><i>密码：</i><input value="" /></div>' +
  '  </div>' +
  '  <div id="btn-wrapper"><button class="btn-1">登录</button><button class="btn-2">获取</button></div>' +
  '</div>'
  $('body').append(monitorWrap)
  cb()
}
module.exports = renderLogin