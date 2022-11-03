const GlobalApi = require('@/api')
const btnAlert = require('@/platform/btnFn/btnAlert')
const ChromeStorage = require('@/utils/ChromeStorage')
const renderSelect = async function () {
  const params = {}
  const selectpickerCurrent = await ChromeStorage.get('selectpicker-current')
  return new Promise((resolve, reject) => {
    GlobalApi.monitorProjectWorkPlug(params).then(res => {
      if (res.data.rows) {
        const selectHtml = constructSelectList(res.data.rows)
        $(selectHtml).prependTo('#previewWrap')
        $('.selectpicker').selectpicker('val', selectpickerCurrent)
        btnSelectBindEvent()
        resolve()
      } else {
        btnAlert('danger', res.data.msg)
        reject(res.data.msg)
      }
    })
  })
}
function constructSelectList (list) {
  const head = '<select class="selectpicker" data-live-search="true" multiple>'
  const tail = '</select>'
  let content = ''
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    content += `<option>${item}</option>`
  }
  const html = `${head}${content}${tail}`
  return html
}
function btnSelectBindEvent () {
  $('.bootstrap-select .selectpicker').on('changed.bs.select', function(e, clickedIndex, newValue, oldValue) {
    console.log(e, this.value, clickedIndex, newValue, oldValue)
    ChromeStorage.set('selectpicker-current', this.value)
  })
}
module.exports = renderSelect