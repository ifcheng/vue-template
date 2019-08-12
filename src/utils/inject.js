import Vue from 'vue'
import Message from './message'
import Loading from './loading'

Object.defineProperties(Vue.prototype, {
  $message: {
    get: () => Message
  },
  $alert: {
    get: () => Message.alert
  },
  $confirm: {
    get: () => Message.confirm
  },
  $loading: {
    get: () => Loading
  }
})
