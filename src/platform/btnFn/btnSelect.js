const ChromeStorage = require('@/utils/ChromeStorage')
function btnSelect () {
  $('.bootstrap-select .selectpicker-project').on('changed.bs.select', function(e, clickedIndex, newValue, oldValue) {
    console.log(e, this.value, clickedIndex, newValue, oldValue, '---------selectpicker-project--------')
    ChromeStorage.set('selectpicker-project', this.value)
  })
  $('.bootstrap-select .selectpicker-ip').on('changed.bs.select', function(e, clickedIndex, newValue, oldValue) {
    console.log(e, this.value, clickedIndex, newValue, oldValue, '---------selectpicker-ip--------')
    ChromeStorage.set('selectpicker-ip', this.value)
  })
}
module.exports = btnSelect