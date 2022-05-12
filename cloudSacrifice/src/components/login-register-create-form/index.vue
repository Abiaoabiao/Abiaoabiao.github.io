<template>
  <div>
    <el-form
      :model="createForm"
      :rules="createRules"
      ref="createFormRef"
      label-width="100%"
      v-if="isCreate && formType"
    >
      <el-form-item>
        <el-input
          v-model="createForm.title"
          placeholder="请输入纪念馆名"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="createForm.type">
          <el-radio label="私人馆"></el-radio>
          <el-radio label="名人馆"></el-radio>
          <el-radio label="恩师馆"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button
          class="submitBtn"
          v-if="submitBtnLoading"
          icon="el-icon-loading"
          >免费创建中...</el-button
        >
        <el-button @click="onSubmit" class="submitBtn" v-else>
          免费创建</el-button
        >
      </el-form-item>
    </el-form>
    <el-form
      :model="createQuickForm"
      :rules="createQuickRules"
      ref="createQuickFormRef"
      label-width="100%"
      v-else-if="isCreate && !formType"
    >
      <el-form-item>
        <el-input
          v-model="createQuickForm.title"
          placeholder="请输入纪念馆名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="">
        <el-radio-group v-model="createQuickForm.type">
          <el-radio label="私人馆"></el-radio>
          <el-radio label="名人馆"></el-radio>
          <el-radio label="恩师馆"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="email">
        <el-input
          v-model.trim="createQuickForm.email"
          prefix-icon="el-icon-message"
          placeholder="请输入邮箱"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model.trim="createQuickForm.password"
          prefix-icon="el-icon-lock"
          placeholder="请输入密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model.trim="createQuickForm.code"
          prefix-icon="el-icon-key"
          placeholder="请输入验证码"
          ><el-button
            slot="append"
            @click="getCodeFlag && getCode()"
            :loading="getCodeLoading"
            >{{ codeText }}</el-button
          >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="submitBtn"
          v-if="submitBtnLoading"
          icon="el-icon-loading"
          >免费创建中...</el-button
        >
        <el-button @click="onSubmit" class="submitBtn" v-else
          >免费创建</el-button
        >
      </el-form-item>
    </el-form>

    <el-form
      :model="loginForm"
      :rules="loginRules"
      ref="loginFormRef"
      label-width="100%"
      v-else
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
      <el-form-item prop="repassword" v-if="!formType">
        <el-input
          v-model.trim="loginForm.repassword"
          prefix-icon="el-icon-lock"
          placeholder="请再次确认密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="!formType">
        <el-input
          v-model.trim="loginForm.code"
          prefix-icon="el-icon-key"
          placeholder="请输入验证码"
          ><el-button
            slot="append"
            @click="getCodeFlag && getCode()"
            :loading="getCodeLoading"
            >{{ codeText }}</el-button
          >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="submitBtn"
          v-if="submitBtnLoading"
          icon="el-icon-loading"
          >{{ formType ? '登录中...' : '注册中...' }}</el-button
        >
        <el-button @click="onSubmit" class="submitBtn" v-else>{{
          formType ? '登录' : '注册'
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { login, register, sendCode } from '@/api/user.js'
import { createHall } from '@/api/hall.js'
export default {
  name: 'LoginReginsterCreateForm',
  components: {},
  model: { prop: 'formType', event: 'update-formType' },
  props: {
    formType: {
      type: Boolean,
      require: true
    },
    isCreate: {
      type: Boolean,
      require: false
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
        code: [{ validator: validateCode, trigger: 'blur' }],
        title: [{ validator: validateCode, trigger: 'blur' }],
        type: [{ validator: validateCode, trigger: 'blur' }]
      },
      createForm: { title: '', type: '' },
      createRules: {
        title: [{ validator: validateCode, trigger: 'blur' }],
        type: [{ validator: validateCode, trigger: 'blur' }]
      },
      createQuickForm: {
        title: '',
        type: '',
        email: '',
        password: '',
        code: ''
      },
      createQuickRules: {
        title: [{ validator: validateCode, trigger: 'blur' }],
        type: [{ validator: validateCode, trigger: 'blur' }],
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
    onSubmit () {
      this.submitBtnLoading = true
      if (this.isCreate && this.formType) {
        this.createMemorialHall()
      } else if (this.isCreate && !this.formType) {
        this.$refs.createQuickFormRef.validate((vaild) => {
          if (!vaild) {
            this.submitBtnLoading = false
            return this.$message({
              message: '信息格式填写正确了，再点击免费创建哦！',
              type: 'warning'
            })
          }
          this.onRegister(this.createQuickForm)
        })
      } else {
        this.$refs.loginFormRef.validate((vaild) => {
          // 是否合格都要将loading关闭哦！所以别忘了 校验不合格也要关loading
          if (!vaild) {
            this.submitBtnLoading = false
            return this.$message({
              message:
                '信息格式填写正确了，再点击' +
                (this.formType ? '登录' : '注册') +
                '哦！',
              type: 'warning'
            })
          }
          const user = this.loginForm // 判断是登录 还是 注册
          if (this.formType) {
            this.onLogin(user)
          } else {
            this.onRegister(user)
          }
        })
      }
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
        console.log(res)
        if (res.code !== 0) {
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
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.$message({ message: '注册成功', type: 'success' })
        this.$emit('update-formType', 1)
      } catch (error) {
        this.$message.error('注册失败！')
        this.submitBtnLoading = false
      }
      this.submitBtnLoading = false
    },
    // 创建纪念馆
    createMemorialHall () {
      this.$refs.createFormRef.validate(async (vaild) => {
        if (!vaild) {
          this.submitBtnLoading = false
          return this.$message({
            message: '信息格式填写正确了，再点击免费创建哦！',
            type: 'warning'
          })
        }
        try {
          const { data: res } = await createHall()
          if (res.code !== 0) {
            this.$message.error(res.msg)
          }
          console.log(res)
          this.$message({ message: '创建成功', type: 'success' })
        } catch (error) {
          console.log(error)
          this.$message.error('创建失败！')
          this.submitBtnLoading = false
        }
        this.submitBtnLoading = false
      })
    },
    // 获得验证码
    getCode () {
      this.getCodeLoading = true
      this.getCodeFlag = false
      this.$refs.loginFormRef.validateField('email', async (vaild) => {
        if (vaild) {
          this.getCodeLoading = false
          this.getCodeFlag = true
          return this.$message({
            message: '邮箱格式填写正确了，再获取验证码哦！',
            type: 'warning'
          })
        }
        try {
          await sendCode({ email: this.loginForm.email, type: 0 })
          this.$message.success('验证码已发送！')
        } catch (error) {
          console.log(error)
          this.$message.error('获取验证码失败！')
        }
        this.getCodeLoading = false
        // 倒计时方法
        this.countDown()
      })
    },
    // 倒计时方法
    countDown () {
      const interval = window.setInterval(() => {
        this.codeText =
          (this.time < 10 ? '0' + this.time : this.time) + '秒后重新发送'
        --this.time
        if (this.time < 0) {
          this.time = 3
          this.codeText = '重新发送'
          this.getCodeFlag = true
          window.clearInterval(interval)
        }
      }, 1000)
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
