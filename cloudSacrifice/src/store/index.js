import Vue from 'vue'
import Vuex from 'vuex'
import { search } from '@/api/hall'
import { setItem, getItem } from '@/utils/storage.js'

Vue.use(Vuex)
const USER = 'USER'
const TOKEN = 'TOKEN'

const store = new Vuex.Store({
  state: {
    isShowMask: false,
    user: getItem(USER),
    token: getItem(TOKEN),
    key: null,
    searchData: []
  },
  getters: {},
  mutations: {
    changeMask (state) {
      state.isShowMask = !state.isShowMask
    },
    setUser (state, val) {
      state.user = val
      setItem(USER, state.user)
    },
    setToken (state, val) {
      state.token = val
      setItem(TOKEN, state.token)
    },
    setKey (state, val) {
      state.key = val
    },
    setSearchData (state, val) {
      state.searchData = val
    }
  },
  actions: {
    async fetchKey (ctx, val) {
      ctx.commit('setKey', val.key)
      const resp = await search(val.key, val.page, val.limit)
      ctx.commit('setSearchData', resp.data.page)
    }
  },
  modules: {}
})

export default store
window.store = store
