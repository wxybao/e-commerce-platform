import request from '@/request.js'

//商城
const shopUrl = '/shop-server/'
export const sale_order = (params) => {
  return request({ url: shopUrl + 'sale_order/', method: 'get', params: params })
}
export const save_order = (params) => {
  return request({ url: shopUrl + 'sale_order', method: 'post', data: params })
}
export const pay_complete = (params) => {
  return request({ url: shopUrl + 'sale_order/pay_complete', method: 'put', params: params })
}

export const user_account = (params) => {
  return request({ url: shopUrl + 'user_account', method: 'post', data: params })
}

export const user_address = (params) => {
  return request({ url: shopUrl + 'user_address/', method: 'get', params: params })
}
export const insert_address = (params) => {
  return request({ url: shopUrl + 'user_address/', method: 'post', data: params })
}
export const upd_address = (params) => {
  return request({ url: shopUrl + 'user_address/', method: 'put', data: params })
}
export const del_address = (params) => {
  return request({ url: shopUrl + 'user_address/' + params, method: 'delete' })
}