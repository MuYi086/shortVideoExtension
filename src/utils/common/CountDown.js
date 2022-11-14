const Util = require('@/utils/Util')
const CountDown = function () {
  const timestamp = Util.newTimeStamp()
  const finalStamp = Util.newTimeStamp(new Date('2022-11-18'))
  if (timestamp > finalStamp) {
    const tip = '%E6%8F%92%E4%BB%B6%E6%9C%AA%E6%8E%88%E6%9D%83%EF%BC%8C%E8%AF%B7%E8%81%94%E7%B3%BB%E4%BD%9C%E8%80%85:%E6%9D%A8%E8%B7%AF'
    alert(decodeURI(tip))
    return false
  } else {
    return true
  }
}
module.exports = CountDown