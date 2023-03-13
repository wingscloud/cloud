import axios, { Method } from 'axios'
import { getConfig } from '@/utils'

const { FEISHU_CONFIG: { FEISHU_URL } } = getConfig()

const request = async ({ url, option = {} }) => {
  return axios.request({
    url,
    ...option,
  })
}

interface IMethodV {
  url: string
  method?: Method
  headers?: { [key: string]: string }
  params?: Record<string, unknown>
  query?: Record<string, unknown>
}

export interface IRequest {
  data: any
  code: number
}

const methodV = async ({
  url,
  method,
  headers,
  params = {},
  query = {},
}: IMethodV): Promise<IRequest> => {
  let sendUrl = ''
  if (/^(http:\/\/|https:\/\/)/.test(url))
    sendUrl = url

  else
    sendUrl = `${FEISHU_URL}${url}`

  return new Promise((resolve, reject) => {
    axios({
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        ...headers,
      },
      url: sendUrl,
      method,
      params: query,
      data: {
        ...params,
      },
    })
      .then(({ data, status }) => {
        resolve({ data, code: status })
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export { request, methodV }
