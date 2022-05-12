import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
Vue.filter('relativeTime', (value) => {
  return dayjs().to(dayjs(value))
})
Vue.filter('dateFormat', (value) => {
  if (!value) {
    return '暂未填写'
  } else {
    return dayjs(value).format('YYYY-MM-DD')
  }
})
