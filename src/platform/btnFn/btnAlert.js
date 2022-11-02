function btnAlert (type = 'error', msg = '提示') {
  let htmlStr = ''
  switch (type) {
    case 'success':
      htmlStr = `<div class="alert alert-success alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span>${msg}</span></div>`
      break
    case 'info':
      htmlStr = `<div class="alert alert-info alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span>${msg}</span></div>`
      break
    case 'warning':
      htmlStr = `<div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span>${msg}</span></div>`
      break
    case 'danger':
      htmlStr = `<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span>${msg}</span></div>`
      break
    default:
      break
  }
  $('#alertWrap').append(htmlStr)
}
module.exports = btnAlert