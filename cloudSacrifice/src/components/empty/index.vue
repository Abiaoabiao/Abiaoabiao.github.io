<template>
  <div class="empty">
    <img src="@/assets/images/empty.png" alt="" />
    <p>暂无内容</p>
  </div>
</template>
<script>
export default {
  name: 'Empty',
  components: {},
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
.empty {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    height: 66px;
    margin-bottom: 10px;
  }
  p {
    font-size: 14px;
    line-height: 14px;
    color: #cccccc;
  }
}
</style>
