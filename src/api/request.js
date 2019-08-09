import axios from 'axios'
import Message from '../utils/message'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    config.loading && Message.loading()
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    Message.closeLoading()
    // Do something with response data
    let data = response.data
    return data
  },
  function(error) {
    Message.closeLoading()
    // Do something with response error
    return Promise.reject(error)
  }
)

export default function request(config) {
  return _axios(config).catch(err => {
    if (config.errMsg !== false) {
      // 可定制错误提示类型，默认为 alert
      let type = config.messageType || 'alert'
      Message[type](getErrMsg(err, config.errMsg))
    }
    return Promise.reject(err)
  })
}

export function getErrMsg(e, msg = '请求异常') {
  return e.message || msg
}
