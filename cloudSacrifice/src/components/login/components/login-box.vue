<template>
  <div class="login">
    <div class="login-dialog">
      <div class="login-top">
        <img
          class="logon-img"
          src="@/assets/images/logon-img.png"
          v-if="isLogin"
          @click="isLogin = !isLogin"
        />
        <img
          class="login-img"
          src="@/assets/images/login-img.png"
          v-else
          @click="isLogin = !isLogin"
        />
        <img
          v-if="isShowClose"
          class="close"
          src="@/assets/images/close.png"
          @click="$emit('close')"
        />
      </div>
      <div class="login-center">
        <div class="login-center-title">
          <h1>欢迎来到云祭祀</h1>
        </div>
        <login-reginster-form
          v-model="isLogin"
          :isCreate="false"
          @close="$emit('close')"
        ></login-reginster-form>
      </div>
    </div>
  </div>
</template>
<script>
import LoginReginsterForm from './login-register-form.vue'
export default {
  name: 'LoginBox',
  components: {
    LoginReginsterForm
  },
  props: {
    isShowClose: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      isLogin: true // 登录为true 注册为false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style scoped lang="less">
.login-dialog {
  background-color: #fff;
  left: 50%;
  margin: -240px 0 0 -205px;
  position: fixed;
  top: 50%;
  width: 420px;
  z-index: 101;
  border-radius: 5px;
  box-shadow: 0 10px 30px 0 rgb(0 0 0 / 10%);
}
.login-top .login-img,
.login-top .logon-img {
  position: absolute;
  top: 0px;
  right: 0px;
}
.login-top .close {
  width: 28px;
  height: 36px;
  position: absolute;
  top: 0;
  right: -37px;
  cursor: pointer;
}
.login-center {
  padding: 80px 55px 60px;
}
.login-center h1 {
  padding-bottom: 35px;
  text-align: center;
  font-weight: 400;
  font-size: 20px;
  color: #000;
}
</style>
