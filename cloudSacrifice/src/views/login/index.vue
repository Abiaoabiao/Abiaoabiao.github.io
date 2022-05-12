<template>
  <div class="login-page">
    <div class="menu-box">
      <a @click="$router.push('/')">进入首页</a>
    </div>
    <login-box :isShowClose="false"></login-box>
  </div>
</template>
<script>
import LoginBox from '../../components/login/components/login-box.vue'
export default {
  name: 'LoginPage',
  components: {
    LoginBox
  },
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {
    '$store.state.user' (newValue) {
      if (newValue) {
        this.$router.push('/')
      }
    }
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style scoped lang="less">
.login-page {
  width: 100vw;
  height: 100vh;
  background: url('https://xy-sweep.oss-cn-guangzhou.aliyuncs.com/2022-4-2/6335dd46-4464-4bab-98c7-49fe13543a8f.jpg')
    no-repeat;
  background-size: cover;
  .menu-box {
    width: 1250px;
    margin: 0 auto;
    height: 50px;
    a {
      font-size: 14px;
      line-height: 50px;
    }
  }
}
</style>
