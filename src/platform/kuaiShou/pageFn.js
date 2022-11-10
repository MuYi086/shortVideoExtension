const pageSearch = require('./subDomain/pageSearch')
const pageProfile = require('./subDomain/pageProfile')
const pageHashTag = require('./subDomain/pageHashTag')
function pageFn () {
  const { pathname } = location
  const subDomain = pathname.split('/')[1]
  switch (subDomain) {
    case 'search':
      pageSearch.init()
      break
    case 'profile':
      pageProfile.init()
      break
    case 'hashtag':
      pageHashTag.init()
      break
    default:
      console.log('其他')
      break
  }
}
module.exports = pageFn