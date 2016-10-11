import { notify_error } from 'utils/notification'
import { json_stringify } from 'utils'
import { api_host } from 'config'

const ajax = (url, {
  method='GET',
  data
}) => {
  return new Promise((resolve, reject) => {
    $.ajax(url, {
      method,
      data
    }).then((res) => {
      if (res.code == 201004) {
        window.location.replace(`${ api_host }/teacher/home/login`)
        return
      }

      if (res.code == 0) {
        resolve(res.data)
      } else {
        reject(res)
        console.warn(res)
        notify_error({
          title: res.msg
        })
      }

    }).fail((res) => {
      reject(res)
      notify_error({
        title: '似乎网络出了点问题, 请稍后重试'
      })
    })
  })
}

export const GET = (url, options={}) => {
  options.method = 'GET'
  return ajax(url, options)
}
export const PUT = (url, options={}) => {
  options.method = 'PUT' //update
  return ajax(url, options)
}
export const POST = (url, options={}) => {
  options.method = 'POST'
  return ajax(url, options)
}
export const DELETE = (url, options={}) => {
  options.method = 'DELETE'
  return ajax(url, options)
}
