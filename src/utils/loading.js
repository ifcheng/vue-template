import { Loading } from 'element-ui'

let timer, start, closePromise
let lockShow = false
let lockClose = false

// 延迟显示加载效果的时间（防止闪烁），ms
const DELAY = 300
// loading 最短持续时间（防止闪烁），ms
const DURATION = 300

export default {
  instance: null,

  show(text) {
    if (lockShow) return
    lockShow = true
    timer = window.setTimeout(() => {
      this.instance = Loading.service({ lock: true, text })
      start = Date.now()
    }, DELAY)
  },

  close() {
    if (lockClose) return closePromise
    lockShow = false
    window.clearTimeout(timer)
    closePromise = new Promise(resolve => {
      if (this.instance) {
        let now = Date.now()
        let interval = now - start
        let wait = interval > DURATION ? 0 : DURATION - interval
        lockClose = true
        window.setTimeout(() => {
          this.instance.close()
          this.instance = null
          lockClose = false
          resolve()
        }, wait)
      } else {
        resolve()
      }
    })
    return closePromise
  }
}
