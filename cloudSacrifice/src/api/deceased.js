import axios from '@/utils/request.js'
export const info = (id) =>
  axios({
    url: `/sweep/deceased/info/${id}`,
    method: 'GET'
  })
export const update = (data) =>
  axios({
    url: '/sweep/deceased/update',
    method: 'PUT',
    data
  })
