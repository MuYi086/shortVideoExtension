const ChromeStorage = {
  get: function (key) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(key, function(data) {
        const error = chrome.runtime.lastError
        if (error) {
          reject(error.message)
        }
        resolve(data[key] || '')
      })
    })
  },
  set: function (key, data) {
    return new Promise((resolve, reject) => {
      const keyValue = {}
      keyValue[key] = data
      chrome.storage.local.set(keyValue, function() {
        const error = chrome.runtime.lastError
        if (error) {
          reject(error.message)
        }
        resolve()
      })
    })
  },
  remove: function (key) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.remove(key, function () {
        const error = chrome.runtime.lastError
        if (error) {
          reject(error.message)
        }
        resolve()
      })
    })
  },
  clear: function () {
    return new Promise((resolve, reject) => {
      chrome.storage.local.clear(function () {
        const error = chrome.runtime.lastError
        if (error) {
          reject(error.message)
        }
        resolve(`已清空扩展缓存`)
      })
    })
  }
}

module.exports = ChromeStorage