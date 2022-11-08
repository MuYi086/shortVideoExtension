const ChromeStorage = require('@/utils/ChromeStorage')
const renderEditSelect = async function () {
  const workList = await ChromeStorage.get('workList')
  const selectHtml = constructSelectList(workList)
  if (workList) {
    const editSelectHtml1 = `
      <div id="work-add" class="disNone">
        <textarea value="" placeholder="请输入IP名称，使用逗号分割"></textarea>
        <button type="button" class="btn btn-workAdd btn-logout btn-xs">添加</button>
      </div>
      <div id="work-select">${selectHtml}</div>
    `
    return editSelectHtml1
  } else {
    const editSelectHtml2 = `
      <div id="work-add">
        <textarea value="" placeholder="请输入IP名称，使用逗号分割"></textarea>
        <button type="button" class="btn btn-workAdd btn-logout btn-xs">添加</button>
      </div>
      <div id="work-select" class="disNone">${selectHtml}</div>
    `
    return editSelectHtml2
  }
}
function constructSelectList (workList) {
  const head = '<select class="selectpicker" data-live-search="true" multiple>'
  const tail = '</select>'
  let content = ''
  for (let i = 0; i < workList.length; i++) {
    const item = workList[i]
    content += `<option>${item}</option>`
  }
  const html = `${head}${content}${tail}`
  return html
}
module.exports = renderEditSelect