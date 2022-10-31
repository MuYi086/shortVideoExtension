const $ = require('jquery')
function dataPreview (data) {
  const { userName, kwaiId, userLink, caption, searchKey, videoUrl, durationStr, likeCount, viewCount } = data
  $('.line .line-0').text(searchKey)
  $('.line .line-1').text(videoUrl)
  $('.line .line-2').text(caption)
  $('.line .line-3').text(durationStr)
  $('.line .line-4').text(userName)
  $('.line .line-5').text(kwaiId)
  $('.line .line-6').text(userLink)
  $('.line .line-7').text(likeCount)
  $('.line .line-8').text(viewCount)
}

module.exports = dataPreview