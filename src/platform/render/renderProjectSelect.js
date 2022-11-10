const ChromeStorage = require('@/utils/ChromeStorage')
const GlobalApi = require('@/api')
const renderProjectSelect = async function () {
  const projectRes = await GlobalApi.monitorProjectList()
  const list = projectRes.data.data || []
  window.SELECTPICKERPROJECTLIST = list
  ChromeStorage.set('selectpicker-projectList', list)
  const selectHtml = constructSelectList(list)
  if (list) {
    const editSelectHtml1 = `
      <div id="project-select">${selectHtml}</div>
    `
    return editSelectHtml1
  }
}
function constructSelectList (projectList) {
  const head = '<select class="selectpicker-project" data-live-search="true" title="请选择项目">'
  const tail = '</select>'
  let content = ''
  for (let i = 0; i < projectList.length; i++) {
    const item = projectList[i]
    content += `<option data-name="${item.projectName}" data-id="${item.id}">${item.projectName}</option>`
  }
  const html = `${head}${content}${tail}`
  return html
}
module.exports = renderProjectSelect