import Vue from 'vue'
import Message from './message'

Object.defineProperties(Vue.prototype, {
  $message: {
    get: () => Message
  },
  $alert: {
    get: () => Message.alert
  },
  $confirm: {
    get: () => Message.confirm
  }
})
