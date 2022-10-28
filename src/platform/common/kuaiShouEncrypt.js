class KuaiShouEnctrypt {
  constructor () {
    this.A = ''
    this.B = ''
    this.C = ''
    this.key = 'BvWTr0uRBGH366Yb'
    this.initSeed = 'c7b645db-65e8-401f-b38c-4c07c5fff247'
  }

  transformString (inputBytes, key) {
    this.A = 0x13579bdf
    this.B = 0x2468ace0
    this.C = 0xfdb97531
    key = key || 'default'
    let i
    let keyLength = key.length
    let seed = new Array(Math.max(12, keyLength))
    for (i = 0; i < keyLength; i++) {
      seed[i] = key[i].charCodeAt(0)
    }
    for (i = 0; keyLength + i < 12; ++i) {
      seed[keyLength + i] = seed[i]
    }
    for (i = 0; i < 4; i++) {
      this.A = (this.A << 8) | seed[i + 4]
      this.B = (this.B << 8) | seed[i + 4]
      this.C = (this.C << 8) | seed[i + 4]
    }
    if (0 === this.A) this.A = 0x13579bdf
    if (0 === this.B) this.B = 0x2468ace0
    if (0 === this.C) this.C = 0xfdb97531
    let length = inputBytes.length
    let outBytes = new Buffer.alloc(length)
    for (let i = 0; i < length; ++i) {
      let byte = inputBytes.readInt8(i, true)
      outBytes[i] = this.transformByte(byte)
    }
    return outBytes
  }

  transformByte (target) {
    let crypto = 0
    let b = this.B & 0x1
    let c = this.C & 0x1
    for (let i = 0; i < 8; ++i) {
      if (0 !== (this.A & 0x1)) {
        this.A = this.A ^ 0x80000062 >>> 1 | 0x80000000
        if (0 !== (this.B & 0x1)) {
          this.B = this.B ^ 0x40000020 >>> 1 | 0xc0000000
          b = 1
        } else {
          this.B = this.B >>> 1 & 0x3fffffff
          b = 0
        }
      } else {
        this.A = this.A >>> 1 & 0x7fffffff
        if (0 !== (this.C & 0x1)) {
          this.C = this.C ^ 0x10000002 >>> 1 | 0xf0000000
          c = 1
        } else {
          this.C = this.C >>> 1 & 0xfffffff
          c = 0
        }
      }
      crypto = crypto << 1 | b ^ c
    }
    target = target ^ crypto
    return target
  }

  crc32(c) {
    let a
    let d = []
    for (let b = 0; 256 > b; b++) {
      a = b
      for (let e = 0; 8 > e; e++) {
        a = a & 1 ? 3988292384 ^ a >>> 1 : a >>> 1
      }
      d[b] = a
    }
    a = -1
    for (let b = 0; b < c.length; b++) {
      a = a >>> 8 ^ d[(a ^ c.charCodeAt(b)) & 255]
    }
    return { result: (a ^ -1) >>> 0, array: d }
  }

  encrypt (inputStr) {
    let baseResult = [222, 192, 173, 222, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 16, 6, 58, 8, 116, 33, '2']
    let key = this.key
    let seed = this.crc32(this.initSeed)
    let table = seed.array
    let inputBytes = new Buffer.from(inputStr)
    let outBytes = this.transformString(inputBytes, key)
    let array = [], array1 = [], array2 = [], z = -1
    for (let i = 0; i < outBytes.length; i++) {
      array[i] = outBytes[i]
    }
    for (let n of array) {
      z = table[(z ^ n) & 255] ^ (z >>> 8)
    }
    z = (~z) >>> 0
    for (let j = 0; j < 4; j++) {
      array1.push(z >>> (j * 8) & 255)
    }
    for (let j = 0; j < 4; j++) {
      array2.push(outBytes.length >>> (j * 8) & 255)
    }
    baseResult = baseResult.concat(array1)
    baseResult = baseResult.concat(array2)
    baseResult = baseResult.concat(array)
    return new Buffer.from(baseResult).toString('base64')
  }
}
let kuaiShouEnctrypt = new KuaiShouEnctrypt()
module.exports = kuaiShouEnctrypt