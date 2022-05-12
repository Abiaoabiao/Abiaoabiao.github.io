import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 全局样式
import './styles/index.less'

// element-ui所提供的css样式
import './plugins/element.js'
// 加载vuex
import store from './store'
// 加载dayjs初始化配置
import './utils/dayjs'
// 导入第三方包
import VueQuillEditor from 'vue-quill-editor'
// 导入样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
// 全局挂载
Vue.use(VueQuillEditor)

Vue.config.productionTip = false
Vue.filter('handelNull', (value) => {
  if (!value) {
    return '暂未填写'
  } else {
    return value
  }
})
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
