const GlobalApi = require('@/api')
const btnAlert = require('@/platform/btnFn/btnAlert')
const renderSelect = async function () {
  const params = {}
  const res = await GlobalApi.monitorProjectWorkPlug(params)
  if (res.rows) {
    return constructSelectList(res.rows)
  } else {
    btnAlert('danger', res.msg)
  }
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