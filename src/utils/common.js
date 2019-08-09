/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

export function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

/**
 * 防抖函数
 * @param {Function} handler 触发事件的实际处理函数
 * @param {Number} delay 延迟时间
 * @returns {Function}
 */
export function debounce(handler, delay) {
  return function(...args) {
    window.clearTimeout(handler.tid)
    handler.tid = window.setTimeout(() => {
      handler.apply(this, args)
    }, delay)
  }
}

/**
 * 节流函数
 * @param {Function} handler 触发事件的实际处理函数
 * @param {Number} interval 间隔时间
 * @returns {Function}
 */
export function throttle(handler, interval) {
  let prev = 0
  return function(...args) {
    let current = Date.now()
    if (current - prev >= interval) {
      handler.apply(this, args)
      prev = current
    }
  }
}
