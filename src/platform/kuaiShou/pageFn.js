const pageSearch = require('./subDomain/pageSearch')
function pageFn () {
  const { pathname } = location
  const subDomain = pathname.split('/')[1]
  switch (subDomain) {
    case 'search':
      pageSearch.init()
      break
    default:
      console.log('其他')
      break
  }
}
module.exports = pageFn