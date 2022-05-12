<template>
  <el-form ref="form" :model="updateInfoform" label-width="100px">
    <el-form-item label="姓名：">
      <el-input v-model="updateInfoform.name"></el-input>
    </el-form-item>
    <el-form-item label="性别：">
      <el-radio-group v-model="updateInfoform.gender">
        <el-radio :label="1">男</el-radio>
        <el-radio :label="0">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="创建于：">
      {{ value.createTime | dateFormat }}
    </el-form-item>
    <el-form-item label="生辰：">
      <el-date-picker
        type="date"
        placeholder="选择日期"
        v-model="updateInfoform.birthday"
        style="width: 100%"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="出生地：">
      <el-input v-model="updateInfoform.habitation"></el-input>
    </el-form-item>
    <el-form-item label="忌日：">
      <el-date-picker
        type="date"
        placeholder="选择日期"
        v-model="updateInfoform.deathday"
        style="width: 100%"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="人物简介：" class="textarea">
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="updateInfoform.introduction"
      >
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button> 取消 </el-button>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { update } from '@/api/deceased.js'
import dayjs from 'dayjs'
export default {
  name: 'UpdateDeceasedInfo',
  components: {},
  props: {
    value: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      updateInfoform: {
        name: '',
        gender: '',
        birthday: '',
        habitation: '',
        deathday: '',
        introduction: ''
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.initialInfo()
  },
  mounted () {},
  methods: {
    async onSubmit () {
      for (const key in this.updateInfoform) {
        if (this.updateInfoform[key] === null) {
          continue
        } else {
          this.value[key] = this.updateInfoform[key]
          if (key === 'birthday' || key === 'deathday') {
            this.value[key] = dayjs(this.value[key]).format(
              'YYYY-MM-DD HH:mm:ss'
            )
          }
        }
      }
      try {
        console.log(this.value)
        const { data: res } = await update(this.value)
        console.log(res)
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.$message({ message: '修改成功', type: 'success' })
        this.$emit('changeEdit')
      } catch (error) {
        this.$message.error('修改失败！')
      }
    },
    initialInfo () {
      for (const key in this.updateInfoform) {
        if (!this.value[key]) {
          continue
        } else {
          this.updateInfoform[key] = this.value[key]
        }
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
    .el-form-item__label,
    .el-form-item__content {
      font-size: 16px;
      color: #333;
    }
  }
  .textarea {
    width: 100%;
  }
}
</style>
