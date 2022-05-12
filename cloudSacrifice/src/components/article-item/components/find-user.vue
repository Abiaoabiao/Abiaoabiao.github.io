<template>
  <span v-if="type === 0">{{ userData.nickname }}</span>
  <img v-else-if="type === 1" :src="userData.head" alt="" />
</template>
<script>
import { userInfo } from '@/api/user'
export default {
  name: 'FindUser',
  components: {},
  props: {
    userId: {
      type: Number,
      require: true
    },
    type: {
      type: Number,
      require: true
    }
  },
  data () {
    return {
      userData: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getUserInfo()
  },
  mounted () {},
  methods: {
    async getUserInfo () {
      try {
        const { data: res } = await userInfo(this.userId)
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.userData = res.user
      } catch (error) {
        this.$message.error('获取作者信息失败')
      }
    }
  }
}
</script>
<style scoped lang="less">
img {
  width: 33px;
  height: 33px;
  border-radius: 100%;
  margin-right: 8px;
}
</style>
