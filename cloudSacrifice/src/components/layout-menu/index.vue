<template>
  <el-menu
    :default-active="menuActive"
    class="el-menu-demo"
    mode="horizontal"
    text-color="#333"
    :router="true"
    active-text-color="#7bd4c1"
  >
    <el-menu-item
      v-for="(item, index) in menuData"
      :key="index"
      :index="item.path"
      ><a>{{ item.name }}</a></el-menu-item
    >
  </el-menu>
</template>
<script>
export default {
  name: 'LayoutMenu',
  components: {},
  props: {},
  data () {
    return {
      menuData: [
        { name: '首页', path: '/' },
        { name: '我的纪念馆', path: '/myMemorialHall' },
        { name: '红色文化', path: '/redCulture' },
        { name: '祭祀文化', path: '/sacrificialCulture' }
      ],
      menuActive: '/'
    }
  },
  computed: {},
  watch: {},
  created () {
    this.menuActive = this.$route.path
  },
  mounted () {},
  methods: {}
}
</script>
<style scoped lang="less">
.el-menu.el-menu--horizontal {
  border: none;
  background-color: rgba(255, 255, 255, 0);
}
</style>
