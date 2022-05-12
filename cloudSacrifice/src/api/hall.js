import axios from '@/utils/request.js'
export const createHall = (data) =>
  axios({
    url: '/sweep/hall/createHall',
    method: 'POST',
    data
  })
export const myHall = () =>
  axios({
    url: '/sweep/hall/myHall',
    method: 'GET'
  })
export const hallInfo = (id) =>
  axios({
    url: `/sweep/hall/info/${id}`,
    method: 'GET'
  })
export const search = (key, page = 1, limit = 6) =>
  axios({
    url: `/sweep/hall/search?page=${page}&limit=${limit}&key=${key}`,
    method: 'GET'
  })
