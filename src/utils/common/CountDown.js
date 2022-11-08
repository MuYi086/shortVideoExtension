const Util = require('@/utils/Util')
const CountDown = function () {
  const timestamp = Util.newTimeStamp()
  const finalStamp = Util.newTimeStamp(new Date('2022-11-18'))
  if (timestamp > finalStamp) {
    alert('插件未授权，请联系作者:杨路')
    return false
  } else {
    return true
  }
}
module.exports = CountDown