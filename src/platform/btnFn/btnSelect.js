const ChromeStorage = require('@/utils/ChromeStorage')
const Util = require('@/utils/Util')
function btnSelect () {
  $('.bootstrap-select .selectpicker-project').on('changed.bs.select', function(e, clickedIndex, newValue, oldValue) {
    console.log(e, this.value, clickedIndex, newValue, oldValue, '---------selectpicker-project--------')
    ChromeStorage.set('selectpicker-project', this.value)
    Util.refresh()
  })
  $('.bootstrap-select .selectpicker-ip').on('changed.bs.select', function(e, clickedIndex, newValue, oldValue) {
    console.log(e, this.value, clickedIndex, newValue, oldValue, '---------selectpicker-ip--------')
    ChromeStorage.set('selectpicker-ip', this.value)
  })
}
module.exports = btnSelect