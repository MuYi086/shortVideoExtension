// const GlobalApi = require('@/api')
const btnAlert = require('@/platform/btnFn/btnAlert')
const renderSelect = async function () {
  // const params = {}
  // const res = await GlobalApi.getIpList(params)
  const res = { data: [1, 2, 3, 4] }
  if (res.data) {
    return constructSelectList(res.data)
  } else {
    btnAlert('danger', res.msg)
  }
}
function constructSelectList (list) {
  const head = '<select class="selectpicker" data-live-search="true">'
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