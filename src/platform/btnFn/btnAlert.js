const Util = require('@/utils/Util')
function btnAlert (type = 'error', msg = '提示') {
  let htmlStr = ''
  const timeStamp = Util.newTimeStamp()
  switch (type) {
    case 'success':
      htmlStr = `<div id="close-${timeStamp}" class="alert alert-success alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span>${msg}</span></div>`
      break
    case 'info':
      htmlStr = `<div id="close-${timeStamp}" class="alert alert-info alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span>${msg}</span></div>`
      break
    case 'warning':
      htmlStr = `<div id="close-${timeStamp}" class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span>${msg}</span></div>`
      break
    case 'danger':
      htmlStr = `<div id="close-${timeStamp}" class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span>${msg}</span></div>`
      break
    default:
      break
  }
  $('#alertWrap').append(htmlStr)
  // 三秒后删除提示
  setTimeout(() => {
    $(`#close-${timeStamp}`).remove()
  }, 3000)
}
module.exports = btnAlert