import axios from '@/utils/request.js'
// 上传头像
export const uploadImg = (data) =>
  axios({
    url: '/sweep/oss/upload',
    method: 'POST',
    data
  })
