const $ = require('jquery')
const ChromeStorage = require('@/utils/ChromeStorage')
const render = require('@/platform/render')
function btnLogin () {
  $('#btn-wrapper .btn-1').click(function () {
    console.log('点击了登录')
    const params = {name: 'ougege'}
    ChromeStorage.set('userInfo', params).then(() => {
      console.log('存储成功')
      render()
    })
  })
}
module.exports = btnLogin