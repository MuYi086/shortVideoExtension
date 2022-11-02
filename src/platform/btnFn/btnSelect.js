const ChromeStorage = require('@/utils/ChromeStorage')
function btnLogin () {
  $('.bootstrap-select .selectpicker').on('changed.bs.select', function(e, clickedIndex, newValue, oldValue) {
      console.log(e, this.value, clickedIndex, newValue, oldValue)
      ChromeStorage.set('selectpicker-current', this.value)
    })
  }
module.exports = btnLogin