<template>
  <header class="layout-container">
    <!-- 搜索框+登录 -->
    <el-row type="flex" justify="end">
      <el-input
        placeholder="纪念馆编号/逝者姓名/建馆人/纪念馆标题"
        v-model="searchValue"
        class="input-with-select"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          class="sreach-btn"
          @click="handleClick(searchValue)"
          >搜索</el-button
        >
      </el-input>
      <login></login>
    </el-row>
    <!-- logo+导航 -->
    <el-row type="flex" class="row-bg" justify="space-between" align="middle">
      <div class="logo-img"><img src="@/assets/images/logo.png" alt="" /></div>
      <layout-menu></layout-menu>
    </el-row>
  </header>
</template>
<script>
import LayoutMenu from '@/components/layout-menu'
import Login from '@/components/login'
export default {
  name: 'LayoutHeader',
  components: {
    Login,
    LayoutMenu
  },
  props: {},
  data () {
    return {
      searchValue: ''
    }
  },
  computed: {},
  watch: {},
  mounted () {},
  methods: {
    handleClick (key) {
      if (!key) {
        return
      }
      this.$router.push({ name: 'search', params: { searchValue: key } })
      this.$store.dispatch('fetchKey', { key })
    }
  }
}
</script>
<style scoped lang="less">
.layout-container {
  // 搜索框
  .el-input-group {
    width: 350px;
    height: 36px;
    box-sizing: border-box;
    font-size: 13px;
    margin-right: 20px;
    /deep/ .el-input__inner {
      height: 100%;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      padding-left: 20px;
      border: 1px solid #7bd4c1;
    }
    /deep/.el-input-group__append {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      background-color: #7bd4c1;
      color: #fff;
      padding: 0 15px;
      border: none;
    }
  }

  .logo-img {
    position: relative;
    img {
      position: absolute;
      top: -62px;
      height: 85px;
    }
  }
  // 菜单
  /deep/ .el-menu.el-menu--horizontal {
    .el-menu-item {
      margin-left: 60px;
      border: none !important;
      position: relative;
      a {
        font-size: 16px;
      }
      a::after {
        position: absolute;
        content: '';
        bottom: 5px;
        left: 0;
        width: 0;
        height: 3px;
        transition: all 0.3s;
        background-color: #7bd4c1;
      }
    }
    .el-menu-item:first-child {
      margin-left: 0;
    }
    .el-menu-item:hover {
      a::after {
        width: 100%;
      }
    }
    .is-active {
      color: #7bd4c1;
      a::after {
        width: 100%;
      }
    }
  }
}
</style>
