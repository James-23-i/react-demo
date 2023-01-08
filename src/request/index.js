import Axios from 'axios'
import { baseURL } from './config'

import { message } from 'antd'

const instance = Axios.create({
  baseURL,
  timeout: 5000,
})

instance.interceptors.request.use(
  (config) => {
    config.headers.authorization = localStorage.getItem('token') || ''
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  (res) => {
    if (res?.data?.type === 'application/octet-stream') {
      const contentDisposition = res.headers['content-disposition']

      let fileName = ''
      if (contentDisposition) {
        fileName = contentDisposition.replace(/.*filename=(.*)/, '$1')
      }
      fileName = decodeURI(fileName)
      if (navigator && navigator.msSaveBlob) {
        // ie下载文件
        navigator.msSaveBlob(res.data, fileName)
      } else {
        // 将服务器获取到的流文件进行转换
        const url = URL.createObjectURL(res.data)
        // 创建 a 标签下载
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
        // 下载完以后移除
        URL.revokeObjectURL(link.href)
        document.body.removeChild(link)
      }
    }
    return res.data
  },
  (err) => {
    if (err?.response) {
      if (err?.response?.status === 400) {
        // todo 400
      } else if (err?.response?.status === 401) {
        // todo 401
      }
    }
    return err
  }
)

export default function request(method, url, params = {}, config = {}) {
  const newParams = {
    method,
    url,
  }
  // 处理下载文件
  if (config.download) {
    newParams.responseType = 'blob'
  }
  if (method === 'get') {
    newParams.params = params
  } else {
    newParams.data = params
  }
  // 不管是调用实例上的哪个方法，实际都是调用到 axios.request()，返回一个promise
  return instance
    .request(newParams)
    .then((res) => {
      // if (res?.data?.code !== 200) {
      //   message.error(res.data.message)
      //   return { error: res.data.message || '请求错误' }
      // }
      return { data: res.data }
    })
    .catch((err) => {
      return { err }
    })
}
