import axios from '@/utils/request.js'
// 发布文章
export const pubContent = (data) =>
  axios({
    url: '/sweep/content/pubContent',
    method: 'POST',
    data
  })
//   根据纪念馆id获取文章
export const hallAriticles = (hallId) =>
  axios({
    url: `/sweep/content/listByHallId/${hallId}`,
    method: 'GET'
  })
// 根据类型获取文章
export const cultureAriticles = (type) =>
  axios({
    url: `/sweep/content/listByType/${type}`,
    method: 'GET'
  })
export const cultureById = (articleId) =>
  axios({
    url: `/sweep/content/info/${articleId}`,
    method: 'GET'
  })
