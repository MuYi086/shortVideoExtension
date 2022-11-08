// import { eventEmitter } from './eventEmiter'
// const eventEmiter = require('./common/eventEmiter')
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
    switch (webDir) {
      case 'profile':
        eventEmitter.emit('kuaishou-profile', '')
        break
      default:
        console.log('这是其他页面')
        break
    }
  }, 1000)
}
module.exports = jqueryScrollInit