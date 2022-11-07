// const Util = require('@/utils/Util')
// const Api = require('../api')
// const btnAlert = require('@/platform/btnFn/btnAlert')
const pageProfile = {
  init: function () {
    this.searchSessionId = ''
    this.count = 0
    this.isInLoading = false
    this.feeds = []
    this.isInputStopTimes = 0
    this.getData()
  },
  getData () {
  },
  reset () {
    this.searchSessionId = ''
    this.count = 0
    this.isInLoading = false
    this.feeds = []
    this.isInputStopTimes = 1
  }
}
module.exports = pageProfile