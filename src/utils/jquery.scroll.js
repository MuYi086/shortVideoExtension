/* eslint-disable */
function jqueryScrollInit () {
  $.fn.scrollEnd = function (callback, timeout) {          
    $(this).on('scroll', function () {
      var $this = $(this)
      if ($this.data('scrollTimeout')) {
        clearTimeout($this.data('scrollTimeout'))
      }
      $this.data('scrollTimeout', setTimeout(callback,timeout))
    })
  }
  
  $(window).scrollEnd(function () {
    const { pathname } = location
    const webDir = pathname.split('/')[1]
    console.log(webDir, '--------hr----------')
    switch (webDir) {
      case 'profile':
        eventEmitter.emit('kuaishou-profile', '')
        break
      case 'search':
        eventEmitter.emit('kuaishou-search', '')
        break
      case 'hashtag':
        eventEmitter.emit('kuaishou-hashtag', '')
        break
      default:
        console.log('这是其他页面')
        break
    }
  }, 1000)
}
module.exports = jqueryScrollInit