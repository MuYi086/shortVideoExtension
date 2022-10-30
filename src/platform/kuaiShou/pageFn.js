const pageSearch = require('./subDomain/pageSearch')
function pageFn () {
  console.log('获取数据并出发渲染')
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