import request from '@/request.js'

//商城
const shopUrl = '/shop-server/'
export const sale_order = (params) => {
  return request({ url: shopUrl + 'sale_order/', method: 'get', params: params })
}
export const save_order = (params) => {
  return request({ url: shopUrl + 'sale_order/', method: 'post', data: params })
}
export const pay_complete = (params) => {
  return request({ url: shopUrl + 'sale_order/pay_complete', method: 'put', data: params })
}
export const wallet_address = (params) => {
  return request({ url: shopUrl + 'user_account/wallet_address', method: 'put', data: params })
}


export const user_account = (params) => {
  return request({ url: shopUrl + 'user_account/', method: 'post', data: params })
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

export const shop_info = (params) => {
  return request({ url: shopUrl + 'profile_resource/shop_info', method: 'get',params: params })
}
export const product_list = (params) => {
  return request({ url: shopUrl + 'product/', method: 'get',params: params })
}
export const product_detail = (params) => {
  return request({ url: shopUrl + 'product/' + params, method: 'get' })
}

export const add_cart = (params) => {
  return request({ url: shopUrl + 'shopping_cart/', method: 'post', data: params })
}
export const get_cart = (params) => {
  return request({ url: shopUrl + 'shopping_cart/' + params, method: 'get' })
}
export const del_cart_product = (params) => {
  return request({ url: shopUrl + 'shopping_cart/', method: 'delete', data: params })
}