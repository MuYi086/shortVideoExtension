const $ = require('jquery')
function renderPlugin (isRegister = true) {
  if (!isRegister) return false
  const monitorWrap = '<div id="monitor">' +
  ' <div class="preview">' +
  '   <div class="line"><i>搜索词：</i><span class="line-0"></span></div>' +
  '   <div class="line"><i>侵权链接：</i><span class="line-1"></span></div>' +
  '   <div class="line"><i>侵权标题:</i><span class="line-2"></span></div>' +
  '   <div class="line"><i>时长:</i><span class="line-3"></span></div>' +
  '   <div class="line"><i>侵权作者:</i><span class="line-4"></span></div>' +
  '   <div class="line"><i>用户id:</i><span class="line-5"></span></div>' +
  '   <div class="line"><i>用户首页链接:</i><span class="line-6"></span></div>' +
  '   <div class="line"><i>热度:</i><span class="line-7"></span></div>' +
  '   <div class="line"><i>浏览量:</i><span class="line-8"></span></div>' +
  '  </div>' +
  '</div>'
  $('body').append(monitorWrap)
}
module.exports = renderPlugin
