import axios from '@/utils/request.js'
export const order = (data) =>
  axios({
    url: '/sweep/order/createOrder',
    method: 'POST',
    data
  })
export const hallOrder = (data) =>
  axios({
    url: '/sweep/order/listByHallId',
    method: 'POST',
    data
  })
