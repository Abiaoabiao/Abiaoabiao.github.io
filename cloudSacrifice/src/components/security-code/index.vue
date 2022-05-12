<template>
  <el-button
    @click="getCodeFlag && getSecuntyCode()"
    :loading="getCodeLoading"
    >{{ codeText }}</el-button
  >
</template>
<script>
import { sendCode } from '@/api/user.js'
export default {
  name: 'SecurityCode',
  components: {},
  props: {
    email: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      getCodeLoading: false,
      time: 60, // 倒计时初始值
      codeText: '获取验证码',
      getCodeFlag: true
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async getSecuntyCode () {
      this.getCodeLoading = true
      this.getCodeFlag = false
      if (!this.isValid(this.email)) {
        this.getCodeLoading = false
        this.getCodeFlag = true
        return this.$message({
          message: '邮箱格式填写正确了，再获取验证码哦！',
          type: 'warning'
        })
      }
      try {
        await sendCode({ email: this.email, type: 0 })
        this.$message.success('验证码已发送！')
      } catch (error) {
        this.$message.error('获取验证码失败！')
      }
      this.getCodeLoading = false
      this.countDown()
    },
    countDown () {
      const interval = window.setInterval(() => {
        this.codeText =
          (this.time < 10 ? '0' + this.time : this.time) + '秒后重新发送'
        --this.time
        if (this.time < 0) {
          this.time = 60
          this.codeText = '重新发送'
          this.getCodeFlag = true
          window.clearInterval(interval)
        }
      }, 1000)
    },
    // 判断email的合法性
    isValid (value) {
      const phoneReg =
        /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (phoneReg.test(value)) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style scoped lang="less"></style>
