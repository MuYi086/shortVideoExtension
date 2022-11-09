function btnCollectList () {
  $('#btn-wrapper .btn-collectList').click(function () {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage()
    } else {
      window.open(chrome.runtime.getURL('./options.html'))
    }
  })
}
module.exports = btnCollectList