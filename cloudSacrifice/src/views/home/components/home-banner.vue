<template>
  <el-carousel>
    <el-carousel-item v-for="(item, index) in bannerPath" :key="index">
      <img :src="item" alt="" />
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
  name: 'HomeBanner',
  components: {},
  props: {},
  data () {
    return {
      bannerPath: [
        require('@/assets/images/banner1.png'),
        require('@/assets/images/banner2.png'),
        require('@/assets/images/banner3.png')
      ]
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
/deep/.el-carousel__container {
  .el-carousel-item {
    img {
      width: 100%;
    }
  }
}
</style>
