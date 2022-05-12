<template>
  <div class="layout-page">
    <el-container>
      <el-header
        ><layout-header></layout-header
      ></el-header>
      <el-main><router-view></router-view></el-main>
    </el-container>
    <layout-footer></layout-footer>
  </div>
</template>
<script>
import LayoutHeader from './components/layout-header.vue'
import LayoutFooter from '@/components/layout-footer'
export default {
  name: 'LayoutPage',
  components: {
    LayoutHeader,
    LayoutFooter
  },
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style scoped lang="less">
.layout-page {
  .el-container {
    max-width: 1200px;
    margin: 0 auto;
    .el-header {
      height: auto !important;
      margin-top: 5px;
      padding: none;
    }
  }
}
</style>
