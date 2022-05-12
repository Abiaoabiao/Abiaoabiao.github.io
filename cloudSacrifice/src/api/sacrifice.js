import axios from '@/utils/request.js'
export const list = (params) =>
  axios({
    url: '/sweep/sacrifice/list',
    method: 'GET',
    params
  })
export const sacrificeInfo = (sacrificeId) =>
  axios({
    url: `/sweep/sacrifice/info/${sacrificeId}`,
    method: 'GET'
  })
