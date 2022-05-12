import axios from '@/utils/request.js'
export const login = (data) =>
  axios({
    url: '/sweep/account/login',
    method: 'POST',
    data
  })
export const register = (data) =>
  axios({
    url: '/sweep/account/register',
    method: 'POST',
    data
  })
export const sendCode = (params) =>
  axios({
    url: '/sweep/emailCode/sendCode',
    method: 'GET',
    params
  })
export const userInfo = (id) =>
  axios({
    url: `/sweep/user/info/${id}`,
    method: 'GET'
  })
export const updateUser = (data) =>
  axios({
    url: '/sweep/user/update',
    method: 'PUT',
    data
  })
