function dataPreview (data) {
  const { userName, kwaiId, userLink, caption, searchKey, videoUrl, durationStr, likeCount, viewCount } = data
  // 接口先请求，但是页面注入dom还未渲染完成
  setTimeout(() => {
    $('.preview .line-0').text(searchKey)
    $('.preview .line-1').text(videoUrl)
    $('.preview .line-2').text(caption)
    $('.preview .line-3').text(durationStr)
    $('.preview .line-4').text(userName)
    $('.preview .line-5').text(kwaiId)
    $('.preview .line-6').text(userLink)
    $('.preview .line-7').text(likeCount)
    $('.preview .line-8').text(viewCount)
  }, 2000)
}

module.exports = dataPreview