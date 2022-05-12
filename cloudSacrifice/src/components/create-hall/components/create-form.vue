<template>
  <div>
    <!-- 快速创建纪念馆 -->
    <el-form
      :model="createQuickForm"
      :rules="createQuickRules"
      ref="createQuickFormRef"
      label-width="100%"
      ><el-form-item prop="title">
        <el-input
          v-model.trim="createQuickForm.title"
          placeholder="请输入纪念馆名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="type">
        <el-radio-group v-model="createQuickForm.type">
          <el-radio :label="0">私人馆</el-radio>
          <el-radio :label="1">名人馆</el-radio>
          <el-radio :label="2">恩师馆</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="email" v-if="isQuick">
        <el-input
          v-model.trim="createQuickForm.email"
          prefix-icon="el-icon-message"
          placeholder="请输入邮箱"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password" v-if="isQuick">
        <el-input
          v-model.trim="createQuickForm.password"
          prefix-icon="el-icon-lock"
          placeholder="请输入密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="isQuick">
        <el-input
          v-model.trim="createQuickForm.code"
          prefix-icon="el-icon-key"
          placeholder="请输入验证码"
          ><security-code
            slot="append"
            :email="createQuickForm.email"
            ></security-code
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
  </div>
</template>
<script>
import { createHall } from '@/api/hall.js'
import { login, register } from '@/api/user.js'
import SecurityCode from '@/components/security-code'
export default {
  name: 'CreateForm1',
  components: {
    SecurityCode
  },
  props: {
    // isQuick 为true 是指没有登录 所以快速创建 为false 是指登录了 所以是正常创建
    isQuick: {
      type: Boolean,
      require: true
    }
  },
  data () {
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
      createQuickForm: {
        title: '',
        type: '',
        email: '',
        password: '',
        code: ''
      },
      createQuickRules: {
        title: [
          { required: true, message: '请输入纪念馆名称', trigger: 'blur' }
        ],
        type: [
          {
            required: true,
            message: '请选择纪念馆类型',
            trigger: 'blur'
          }
        ],
        email: [{ validator: vaildateEmail, trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3到 12 个字符', trigger: 'blur' }
        ],
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
    hint () {
      this.submitBtnLoading = false
      this.$message({
        message: '信息格式填写正确了，再点击免费创建哦！',
        type: 'warning'
      })
    },
    onSubmit () {
      this.submitBtnLoading = true
      this.$refs.createQuickFormRef.validate(async (vaild) => {
        if (!vaild) {
          return this.hint()
        }
        if (this.isQuick) {
          this.createQuickMemorialHall()
          this.submitBtnLoading = false
        } else {
          this.createMemorialHall(this.createQuickForm)
          this.submitBtnLoading = false
        }
      })
    },
    async createQuickMemorialHall () {
      try {
        const info = this.createQuickForm
        this.onRegister(info)
      } catch (error) {
        console.log(error)
        this.$message.error('创建失败！')
      }
    },
    async onRegister (info) {
      try {
        const { data: res } = await register(info)
        if (res.code !== 0) {
          if (res.code === 5001) {
            return this.onLogin(info)
          }
          return this.$message.error(res.msg)
        }
        return this.onLogin(info)
      } catch (error) {
        this.$message.error('创建失败！')
      }
    },
    async onLogin (info) {
      const loginData = {
        account: info.email,
        password: info.password
      }
      try {
        const { data: res } = await login(loginData)
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.$store.commit('setUser', res.user)
        this.$store.commit('setToken', res.token)
        return this.createMemorialHall(info)
      } catch (error) {
        this.$message.error('创建失败！')
      }
    },
    async createMemorialHall (info) {
      const createData = { title: info.title, type: info.type }
      try {
        const { data: res } = await createHall(createData)
        console.log(123)
        console.log(res)
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.$message({ message: '创建成功', type: 'success' })
        this.$emit('close')
        console.log(res.data.identifier)
        this.$router.push(`/memorialHall/${res.data.identifier}`)
      } catch (error) {
        console.log(error)
        this.$message.error('创建失败！')
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
