import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
// 修改原型对象中的push方法
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch((err) => err)
}
// 路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('@/views/search'),
        props: true
      },
      {
        path: '/myMemorialHall',
        name: 'myMemorialHall',
        component: () => import('@/views/my-memorial-hall')
      },
      {
        path: '/redCulture',
        name: 'redCulture',
        component: () => import('@/views/red-culture')
      },
      {
        path: '/sacrificialCulture',
        name: 'sacrificialCulture',
        component: () => import('@/views/sacrificial-culture')
      },
      {
        path: '/culture/:articleId',
        name: 'culture',
        props: true,
        component: () => import('@/views/culture')
      }
    ]
  },
  {
    path: '/memorialHall/:hallPath',
    component: () => import('@/views/memorial-hall'),
    props: true,
    children: [
      {
        path: '',
        name: 'memorialHome',
        props: true,
        component: () => import('@/views/memorial-home')
      },
      {
        path: '/memorialArticle/:hallPath',
        name: 'memorialArticle',
        component: () => import('@/views/memorial-article'),
        props: true
      },
      {
        path: '/memorialAlbum/:hallPath',
        name: 'memorialAlbum',
        props: true,
        component: () => import('@/views/memorial-album')
      }
    ]
  },
  {
    path: '/memorialKneel/:hallPath',
    name: 'memorialKneel',
    props: true,
    component: () => import('@/views/memorial-kneel')
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/myMemorialHall') {
    const token = store.state.token
    if (!token) {
      return next('/login')
    }
  }
  next()
})

export default router
