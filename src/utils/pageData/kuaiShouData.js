function getPageData () {
  return new Promise((resolve, reject) => {
    try {
      const { pathname, search } = location
      const pathnameArr = pathname.split('/')
      const len = pathnameArr.length
      const photoId = pathnameArr[len - 1]
      const h5Url = `https://m.gifshow.com/fw/photo/${photoId}${search}`
      window.open(h5Url)
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}
const kuaiShouData = {
  getPageData
}
module.exports = kuaiShouData