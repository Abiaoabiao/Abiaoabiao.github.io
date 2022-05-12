<template>
  <div>
    <home-banner></home-banner>
    <home-search></home-search>
  </div>
</template>

<script>
import HomeBanner from '../home/components/home-banner.vue'
import HomeSearch from '../home/components/home-search.vue'

export default {
  name: 'Search',
  components: {
    HomeBanner,
    HomeSearch
  },
  props: {
    searchValue: {
      type: String
    }
  },
  data () {
    return {
      current: 0,
      key: null
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style></style>
