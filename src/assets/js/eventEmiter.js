const eventEmitter = {
  // 缓存列表
  list: {},
  // 订阅
  on (event, fn) {
    // 如果没有event值,就给event创建个缓存列表
    // 如果有对应的event值,把fn添加到对应event的缓存列表里
    (this.list[event] || (this.list[event] = [])).push(fn)
    return this
  },
  // 监听一次
  once (event, fn) {
    // 先绑定,调用后删除
    function on () {
      this.off(event, on)
      fn.apply(this, arguments)
    }
    on.fn = fn
    this.on(event, on)
    return this
  },
  // 取消订阅
  off (event, fn) {
    let fns = this.list[event]
    // 如果缓存列表中没有对应的fn,返回false
    if (!fns) return false
    if (!fn) {
      // 如果fn不存在,就会将event值对应缓存列表中的fn都清空
      fns && (fns.length = 0)
    } else {
      // 如果有fn, 遍历缓存列表,看看传入的fn与那个函数相同,如果相同就直接从缓存列表中删除
      let cb
      let cbLen = fns.length
      for (let i = 0; i < cbLen; i++) {
        cb = fns[i]
        if (cb === fn || cb.fn === fn) {
          fns.splice(i, 1)
          break
        }
      }
    }
    return this
  },
  // 发布
  emit () {
    // 第一个参数对应的event值,直接用数组的shift方法取出
    let event = [].shift.call(arguments)
    let fns = [...this.list[event]]
    // 如果缓存列表里没有fn就返回false
    if (!fns || fns.length === 0) {
      return false
    }
    // 遍历event值对应的缓存列表,依次执行fn
    fns.forEach(fn => {
      fn.apply(this, arguments)
    })
    return this
  }
}
window.eventEmitter = eventEmitter