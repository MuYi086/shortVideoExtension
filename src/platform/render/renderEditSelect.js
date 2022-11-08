const ChromeStorage = require('@/utils/ChromeStorage')
const renderEditSelect = async function () {
  const selectHtml = await constructSelectList()
  const editSelectHtml = `
    <div id="work-add">
      <textarea value="" placeholder="请输入IP名称，使用逗号分割"></textarea>
      <button type="button" class="btn btn-workAdd btn-logout btn-xs">添加</button>
    </div>
    <div id="work-select">${selectHtml}</div>
  `
  return editSelectHtml
}
async function constructSelectList () {
  const head = '<select class="selectpicker" data-live-search="true" multiple>'
  const tail = '</select>'
  let content = ''
  const workList = await ChromeStorage.get('workList')
  console.log(workList, '-------------------------attr----------------------')
  return new Promise((resolve, reject) => {
    try {
      if (workList) {
        for (let i = 0; i < workList.length; i++) {
          const item = workList[i]
          content += `<option>${item}</option>`
        }
        resolve(`${head}${content}${tail}`)
      } else {
        resolve(`${head}${content}${tail}`)
      }
    } catch (err) {
      reject(err)
    }
  })
}
module.exports = renderEditSelect