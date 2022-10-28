const $ = require('jquery')
function renderPlugin () {
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
  '  <div class="startBtn"><button id="test">测试</button></div>' +
  '</div>'
  $('body').append(monitorWrap)
}

// function dataPreview (data) {
//   const { userName, kwaiId, userLink, caption, searchKey, videoUrl, durationStr, likeCount, viewCount } = data
//   $('.line .line-0').text(searchKey)
//   $('.line .line-1').text(videoUrl)
//   $('.line .line-2').text(caption)
//   $('.line .line-3').text(durationStr)
//   $('.line .line-4').text(userName)
//   $('.line .line-5').text(kwaiId)
//   $('.line .line-6').text(userLink)
//   $('.line .line-7').text(likeCount)
//   $('.line .line-8').text(viewCount)
// }
module.exports = renderPlugin
