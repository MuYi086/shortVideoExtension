const renderEditSelect = require('./renderEditSelect')
const renderProjectSelect = require('./renderProjectSelect')
const renderPreview = async function () {
  const renderProjectSelectHtml = await renderProjectSelect()
  const renderEditSelectHtml = await renderEditSelect()
  const renderPreviewHtml = '<div id="previewWrap">' +
    renderProjectSelectHtml +
    '	  <br>' +
    renderEditSelectHtml +
    '	  <br>' +
    '	  <br>' +
    '	  <div id="btn-wrapper" class="btn-group">' +
    '		  <button type="button" class="btn btn-primary btn-submit-tort btn-xs">侵权</button>' +
    // '		  <button type="button" class="btn btn-primary btn-submit-normal btn-xs">正常</button>' +
    '		  <button type="button" class="btn btn-primary btn-collectList btn-xs">收藏列表</button>' +
    '		  <button type="button" class="btn btn-danger btn-selectClear btn-xs">清空下拉框</button>' +
    '		  <button type="button" class="btn btn-danger btn-logout btn-xs">退出</button>' +
    '	  </div>' +
    '	  <br>' +
    '	  <br>' +
    '   <div class="preview">' +
    '     <div class="line"><i>侵权链接：</i><span class="line-1"></span></div>' +
    '     <div class="line"><i>侵权标题:</i><span class="line-2"></span></div>' +
    '     <div class="line"><i>时长:</i><span class="line-3"></span></div>' +
    '     <div class="line"><i>发布日期:</i><span class="line-4"></span></div>' +
    '     <div class="line"><i>侵权作者:</i><span class="line-5"></span></div>' +
    '     <div class="line"><i>用户id:</i><span class="line-6"></span></div>' +
    '     <div class="line"><i>用户首页链接:</i><span class="line-7"></span></div>' +
    '     <div class="line"><i>热度:</i><span class="line-8"></span></div>' +
    '     <div class="line"><i>浏览量:</i><span class="line-9"></span></div>' +
    '   </div>' +
    '</div>'
  return new Promise((resolve, reject) => {
    try {
      resolve(renderPreviewHtml)
    } catch (err) {
      reject('出错了')
    }
  })
}

module.exports = renderPreview
