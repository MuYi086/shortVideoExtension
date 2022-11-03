const GlobalApi = require('@/api')
const btnAlert = require('@/platform/btnFn/btnAlert')
const renderSelect = async function () {
  const params = {}
  return new Promise((resolve, reject) => {
    GlobalApi.monitorProjectWorkPlug(params).then(res => {
      if (res.data.data) {
        const selectHtml = constructSelectList(res.data.data)
        // btnSelectBindEvent()
        resolve(selectHtml)
      } else {
        btnAlert('danger', res.msg)
        resolve('')
      }
    }).catch(err => {
      reject(err)
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
// function btnSelectBindEvent () {
//   $('.bootstrap-select .selectpicker').on('changed.bs.select', function(e, clickedIndex, newValue, oldValue) {
//     console.log(e, this.value, clickedIndex, newValue, oldValue)
//     ChromeStorage.set('selectpicker-current', this.value)
//   })
// }
module.exports = renderSelect