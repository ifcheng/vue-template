// import { Plugin } from 'module'

let timer, start, closePromise
let lockShow = false
let lockClose = false
let loading = false

// 延迟显示加载效果的时间（防止闪烁），ms
const DELAY = 300
// loading动画最短持续时间（防止闪烁），ms
const DURATION = 500

export default {
  show() {
    if (lockShow) return
    lockShow = true
    timer = window.setTimeout(() => {
      // 开启loading动画
      start = Date.now()
      loading = true
    }, DELAY)
  },

  close() {
    if (lockClose) return closePromise
    lockShow = false
    window.clearTimeout(timer)
    closePromise = new Promise(resolve => {
      if (loading) {
        let now = Date.now()
        let interval = now - start
        let wait = interval > DURATION ? 0 : DURATION - interval
        lockClose = true
        window.setTimeout(() => {
          // 关闭loading动画
          loading = lockClose = false
          resolve()
        }, wait)
      } else {
        resolve()
      }
    })
    return closePromise
  }
}
