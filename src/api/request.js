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
  function(response) {
    // Do something with response data
    let data = response.data
    return data
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

export default function request(options) {
  // 解构属性均为自定义扩展属性
  const { loading, loadingText, errMsg, messageType = 'error' } = options
  loading && Loading.show(loadingText)
  return _axios(options)
    .then(async data => {
      loading && (await Loading.close())
      return data
    })
    .catch(async err => {
      await Loading.close()
      if (errMsg !== false) {
        Message[messageType](getErrMsg(err, errMsg))
      }
      return Promise.reject(err)
    })
}

export function getErrMsg(err, msg = '请求异常') {
  return err.message || msg
}
