// 封装本地存储操作
// 存储数据
export const setItem = (key, val) => {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  window.localStorage.setItem(key, val)
}
// 获取数据
export const getItem = (key) => {
  const val = window.localStorage.getItem(key)
  try {
    return JSON.parse(val)
  } catch (error) {
    return val
  }
}
// 删除数据
export const remove = (key) => {
  window.localStorage.removeItem(key)
}
