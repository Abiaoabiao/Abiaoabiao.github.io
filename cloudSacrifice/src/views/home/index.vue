<template>
  <div>
    <home-banner></home-banner>
    <home-data></home-data>
  </div>
</template>
<script>
import HomeBanner from './components/home-banner.vue'
import HomeData from './components/home-data.vue'
export default {
  name: 'Home',
  components: {
    HomeBanner,
    HomeData
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
<style scoped lang="less"></style>
