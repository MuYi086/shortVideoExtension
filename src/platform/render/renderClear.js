const $ = require('jquery')
function renderClear () {
  const monitorDom = $("#monitor")
  if (monitorDom) {
    monitorDom.remove()
  }
}
module.exports = renderClear