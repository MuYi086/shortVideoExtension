const bgFnArr = require('@/utils/background')
console.log('hello world background todo something~')
bgFnArr.forEach(li => {
  li()
})
