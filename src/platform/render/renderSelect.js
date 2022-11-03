const GlobalApi = require('@/api')
const btnAlert = require('@/platform/btnFn/btnAlert')
const renderSelect = function () {
  return new Promise((resolve, reject) => {
    const params = {}
    GlobalApi.monitorProjectWorkPlug(params).then(res => {
      if (res.data.rows) {
        resolve(constructSelectList(res.data.rows))
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
module.exports = renderSelect