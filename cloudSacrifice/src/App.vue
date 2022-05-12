<template>
  <div id="app">
    <div :class="{ mask: $store.state.isShowMask }"></div>
    <!-- 路由填充位 -->
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang="less">
.mask {
  margin: 0;
  background-color: #000;
  width: 100%;
  height: 100%;
  top: 0px;
  position: fixed;
  opacity: 0.3;
  -webkit-opacity: 0.3;
  -moz-opacity: 0.3;
  z-index: 100;
}
</style>
