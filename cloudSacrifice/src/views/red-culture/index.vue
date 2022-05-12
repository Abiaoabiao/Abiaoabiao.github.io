<template>
  <div class="culture">
    <culture-list :type="4"></culture-list>
  </div>
</template>
<script>
import CultureList from '@/components/culture-list'

export default {
  name: 'RedCulture',
  components: {
    CultureList
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
.culture {
  width: 100%;
  padding-top: 10px;
}
</style>
