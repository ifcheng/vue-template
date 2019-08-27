import axios from 'axios'
import Message from '../utils/message'
import Loading from '../utils/loading'

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
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  async function(response) {
    // Do something with response data
    let data = response.data
    return data
  },
  async function(error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

export default function request(options) {
  options.loading && Loading.show()
  return _axios(options)
    .then(async data => {
      options.loading && (await Loading.close())
      return data
    })
    .catch(async err => {
      await Loading.close()
      if (options.errMsg !== false) {
        // 可定制错误提示类型，默认为 alert
        let type = options.messageType || 'alert'
        Message[type](getErrMsg(err, options.errMsg))
      }
      return Promise.reject(err)
    })
}

export function getErrMsg(e, msg = '请求异常') {
  return e.message || msg
}
