import { Message, MessageBox } from 'element-ui'
import { isObject } from './common'

const msgOptions = {}

export default {
  alert(message, options) {
    return MessageBox.alert({
      title: '提示',
      message,
      ...options
    })
  },

  confirm(message, type, options) {
    if (isObject(type) && options === undefined) {
      options = type
      type = undefined
    }
    return MessageBox.confirm({
      title: '提示',
      message,
      type,
      ...options
    })
  },

  success(message) {
    return Message({
      type: 'success',
      message,
      ...msgOptions
    })
  },

  error(message) {
    return Message({
      type: 'error',
      message,
      ...msgOptions
    })
  },

  warning(message) {
    return Message({
      type: 'warning',
      message,
      ...msgOptions
    })
  },

  info(message) {
    return Message({
      type: 'info',
      message,
      ...msgOptions
    })
  }
}
