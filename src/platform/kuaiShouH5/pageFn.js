const pageWd = require('./subDomain/pageWd')
function pageFn () {
  const { pathname } = location
  const subDomain = pathname.split('/')[1]
  switch (subDomain) {
    case 'fw':
      pageWd.init()
      break
    default:
      console.log('其他')
      break
  }
}
module.exports = pageFn