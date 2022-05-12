<template>
  <div class="list">
    <ul>
      <li v-for="item in foundData" :key="item.id">
        <a target="_blank" href="">{{ item.name }}</a
        ><span>{{ item.createdate | relativeTime }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'FoundList',
  components: {},
  props: {},
  data () {
    return {
      foundData: [
        {
          id: 1,
          name: '北京大学历史学系马斌',
          createdate: '2022-03-26 12:00:00'
        },
        { id: 2, name: '知名台湾歌手邱晨', createdate: '2022-03-11 09:00:00' },
        {
          id: 3,
          name: '香港资深配音演员谢月美',
          createdate: '2021-03-11 09:00:00'
        },
        {
          id: 4,
          name: '东北大学外语院山泽明',
          createdate: '2020-03-11 09:00:00'
        },
        { id: 5, name: '缅怀张素兰女士', createdate: '2019-05-11 09:00:00' },
        { id: 6, name: '慈父黄三元', createdate: '2019-04-11 09:00:00' },
        { id: 7, name: '爸爸妈妈的馆', createdate: '2019-03-11 09:00:00' }
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
@import './home-data-list';
.list {
  ul li {
    height: 28px;
    line-height: 28px;
  }
  a {
    width: 85px;
  }
  span {
    color: #aaa;
  }
}
</style>
