/**
 * @Author: yanglu
 * @Email: 1258947325@qq.com
 * @Intro: 对js类型判断
 * @Blog: https://github.com/ougege/blog
 * @Date: 2017/10/21
 * @Update: 2021/12/23 11:26
 */
 class Type {
  constructor () {
    this.typeList = ['Null', 'Undefined', 'Object', 'Array', 'ArrayBuffer', 'String', 'Number', 'Boolean', 'Function', 'RegExp', 'Date', 'FormData', 'File', 'Blob', 'URLSearchParams']
    this.init()
  }

  type (value) {
    const s = Object.prototype.toString.call(value)
    return s.match(/\[object (.*?)\]/)[1].toLowerCase()
  }

  // 增加判断类型数据方法
  init () {
    this.typeList.forEach((t) => {
      this['is' + t] = (o) => {
        return this.type(o) === t.toLowerCase()
      }
    })
  }

  // isBuffer
  isBuffer (val) {
    return val !== null && !this.isUndefined(val) && val.constructor !== null && !this.isUndefined(val.constructor) && this.isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val)
  }

  // isStream
  isStream (val) {
    return this.isObject(val) && this.isFunction(val.pipe)
  }
}

const type = new Type()
// 使用 type["isNull"](null)等
module.export = type
