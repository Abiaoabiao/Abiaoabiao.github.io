<template>
  <div>
    <el-form
      :model="loginForm"
      :rules="loginRules"
      ref="loginFormRef"
      label-width="100%"
    >
      <el-form-item prop="email">
        <el-input
          v-model.trim="loginForm.email"
          prefix-icon="el-icon-message"
          placeholder="请输入邮箱"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model.trim="loginForm.password"
          prefix-icon="el-icon-lock"
          placeholder="请输入密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item prop="repassword" v-if="!isLogin">
        <el-input
          v-model.trim="loginForm.repassword"
          prefix-icon="el-icon-lock"
          placeholder="请再次确认密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="!isLogin">
        <el-input
          v-model.trim="loginForm.code"
          prefix-icon="el-icon-key"
          placeholder="请输入验证码"
        >
          <security-code :email="loginForm.email" slot="append"></security-code>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="submitBtn"
          v-if="submitBtnLoading"
          icon="el-icon-loading"
          >{{ isLogin ? '登录中...' : '注册中...' }}</el-button
        >
        <el-button @click="onSubmit" class="submitBtn" v-else>{{
          isLogin ? '登录' : '注册'
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { login, register } from '@/api/user.js'
import SecurityCode from '@/components/security-code'
export default {
  name: 'LoginReginsterForm',
  components: {
    SecurityCode
  },
  model: { prop: 'isLogin', event: 'update-is_Login' },
  props: {
    isLogin: {
      type: Boolean,
      require: true
    }
  },
  data () {
    var vaildateRePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (value !== this.loginForm.password) {
          callback(new Error('两次输入密码不一致！'))
        } else {
          callback()
        }
      }
    }
    var vaildateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else {
        const phoneReg =
          /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (phoneReg.test(value)) {
          callback()
        } else {
          callback(new Error('邮箱格式不正确'))
        }
      }
    }
    var validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else {
        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value.length === 4) {
            callback()
          } else {
            callback(new Error('验证码长度错误'))
          }
        }
      }
    }
    return {
      loginForm: {
        email: '',
        password: ''
      },
      loginRules: {
        email: [{ validator: vaildateEmail, trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        repassword: [{ validator: vaildateRePass, trigger: 'blur' }],
        code: [{ validator: validateCode, trigger: 'blur' }]
      },
      submitBtnLoading: false, // 控制loading效果
      getCodeLoading: false,
      time: 3, // 倒计时初始值
      codeText: '获取验证码',
      getCodeFlag: true // 控制发送验证码的点击事件 true 点击事件有效 false 点击事件无效
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 登录 注册 按钮的点击事件
    onSubmit () {
      // 点击后loading开启
      this.submitBtnLoading = true
      // 先判断数据是否合格
      this.$refs.loginFormRef.validate((vaild) => {
        // 是否合格都要将loading关闭哦！ 所以别忘了 校验不合格也要关闭loading
        if (!vaild) {
          this.submitBtnLoading = false
          return this.$message({
            message:
              '信息格式填写正确了，再点击' +
              (this.isLogin ? '登录' : '注册') +
              '哦！',
            type: 'warning'
          })
        }
        const user = this.loginForm
        // 判断是登录 还是 注册
        if (this.isLogin) {
          this.onLogin(user)
        } else {
          this.onRegister(user)
        }
      })
    },
    // 登录事件
    async onLogin (user) {
      // 因为后台的数据名 为account 所以这边这样写 是为了该数据名
      const loginData = {
        account: user.email,
        password: user.password
      }
      try {
        const { data: res } = await login(loginData)
        if (res.code !== 0) {
          this.submitBtnLoading = false
          return this.$message.error(res.msg)
        }
        this.$store.commit('setUser', res.user)
        this.$store.commit('setToken', res.token)
        this.$emit('close')
        this.$message({ message: '登录成功', type: 'success' })
      } catch (error) {
        this.$message.error('登录失败！')
        this.submitBtnLoading = false
      }
      this.submitBtnLoading = false
    },
    // 注册事件
    async onRegister (user) {
      try {
        const { data: res } = await register(user)
        console.log(res)
        if (res.code !== 0) {
          this.submitBtnLoading = false
          return this.$message.error(res.msg)
        }
        this.$message({ message: '注册成功', type: 'success' })
        this.$emit('update-is_Login', !this.isLogin)
      } catch (error) {
        this.$message.error('注册失败！')
        this.submitBtnLoading = false
      }
      this.submitBtnLoading = false
    }
  }
}
</script>
<style scoped lang="less">
@maincolor: #3fc2a6;
/deep/.el-form-item__content {
  margin: 0 !important;
}
.submitBtn {
  width: 100%;
  background-color: #33aba0;
  color: #fff;
}
.submitBtn:hover {
  background-color: @maincolor;
}
</style>
