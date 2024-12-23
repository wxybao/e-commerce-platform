
/**
 * 时间格式化
 * @returns {string}
 * @param date
 * @param fmt
 */
export function timeFormat(date, fmt) {
  if (date && date.constructor === String) {
    date = date.replace(/-/g, '/')
    date = date.split('.')[0]
  }
  date = new Date(date)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length))
    }
  }

  return fmt
}

/**
 * 获取数据类型
 * */
export function getDataType(value) {
  if (value === null) {
    return 'null'
  }
  if (value === undefined) {
    return 'undefined'
  }

  const type = typeof value
  if (type !== 'object') {
    return type
  }
  if (Array.isArray(value)) {
    return 'array'
  }
  return 'object'
}

/*
 * 深拷贝
 */
export function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj // 处理null
  if (typeof obj !== 'object') return obj // 处理基本类型
  if (hash.has(obj)) return hash.get(obj) // 防止循环引用

  let cloneObj
  if (obj instanceof Array) {
    cloneObj = []
    for (let i = 0; i < obj.length; i++) {
      cloneObj[i] = deepClone(obj[i], hash)
    }
  } else if (obj instanceof Object) {
    cloneObj = {}
    for (let key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        cloneObj[key] = deepClone(obj[key], hash)
      }
    }
  }

  hash.set(obj, cloneObj)
  return cloneObj
}