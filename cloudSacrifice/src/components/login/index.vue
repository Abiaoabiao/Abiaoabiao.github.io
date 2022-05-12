<template>
  <div class="layout-login">
    <img
      src="@/assets/images/login.png"
      alt=""
      class="login-img"
      @click="changeShowBox"
      v-if="!$store.state.user"
    />
    <img
      :src="head"
      alt=""
      class="login-img"
      @mouseover="isShowInfo = true"
      @mouseout="isShowInfo = false"
      v-if="$store.state.user"
    />
    <login-box v-show="isShowBox" @close="changeShowBox"></login-box>
    <login-info
      v-model="isShowInfo"
      :head="head"
      v-if="$store.state.user"
    ></login-info>
  </div>
</template>
<script>
import LoginBox from './components/login-box.vue'
import LoginInfo from './components/login-info.vue'
export default {
  name: 'Login',
  components: {
    LoginBox,
    LoginInfo
  },
  props: {},
  data () {
    return {
      isShowBox: false,
      isShowInfo: false
    }
  },
  computed: {
    head () {
      if (!this.$store.state.user) {
        return ''
      } else {
        return this.$store.state.user.head
          ? this.$store.state.user.head
          : require('@/assets/images/head.jpg')
      }
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    changeShowBox () {
      this.isShowBox = !this.isShowBox
      this.$store.commit('changeMask')
    }
  }
}
</script>
<style scoped lang="less">
.layout-login {
  .login-img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
}
</style>
