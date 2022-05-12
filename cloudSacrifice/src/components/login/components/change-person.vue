<template>
  <el-collapse-transition>
    <el-form ref="personFormRef" :model="personForm" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="personForm.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        {{ user.email }}
      </el-form-item>
      <el-form-item label="昵称">
        <el-input
          v-model="personForm.nickname"
          placeholder="请输入昵称"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input
          v-model="personForm.phone"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="QQ">
        <el-input v-model="personForm.qq" placeholder="请输入QQ"></el-input>
      </el-form-item>
      <el-form-item label="居住地">
        <el-input
          v-model="personForm.habitation"
          placeholder="请输入居住地"
        ></el-input>
      </el-form-item>
      <el-form-item class="btn-box">
        <el-button type="primary" @click="onSubmit" placeholder="请输入内容"
          >确认修改</el-button
        >
      </el-form-item>
    </el-form>
  </el-collapse-transition>
</template>
<script>
import { updateUser } from '@/api/user'
import _ from 'lodash'
export default {
  name: 'ChangePerson',
  components: {},
  props: {
    user: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      personForm: {
        name: this.user.name || '',
        nickname: this.user.nickname || '',
        phone: this.user.phone || '',
        qq: this.user.qq || '',
        habitation: this.user.habitation || ''
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit () {
      try {
        const { data: res } = await updateUser(this.personForm)
        if (res.code !== 0) {
          this.$message.error(res.msg)
        }
        const userData = _.cloneDeep(this.user)
        for (const key in this.personForm) {
          userData[key] = this.personForm[key]
        }
        this.$store.commit('setUser', userData)
        this.$message.success('修改个人信息成功！')
      } catch (error) {
        this.$message.error('修改个人信息失败！')
      }
    }
  }
}
</script>
<style scoped lang="less">
.el-form {
  display: flex;
  flex-wrap: wrap;
  /deep/.el-form-item {
    width: 50%;
  }
  .btn-box {
    width: 100%;
    /deep/.el-form-item__content {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
