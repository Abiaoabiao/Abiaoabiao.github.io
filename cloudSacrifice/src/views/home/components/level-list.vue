<template>
  <div class="list">
    <el-row class="list-box">
      <el-col :md="8" class="pl-15">
        <h4>深情指数榜</h4>
        <ul>
          <li v-for="(item, index) in showData.deep" :key="index">
            <a target="_blank" href="">{{ item.name }}</a
            ><span>{{ item.num }}</span>
          </li>
        </ul>
      </el-col>
      <el-col :md="8" class="pl-15">
        <h4>爱心指数榜</h4>
        <ul>
          <li v-for="(item, index) in showData.love" :key="index">
            <a target="_blank" href="">{{ item.name }}</a
            ><span>{{ item.num }}</span>
          </li>
        </ul>
      </el-col>
      <el-col :md="8" class="pl-15">
        <h4>人气指数榜</h4>
        <ul>
          <li v-for="(item, index) in showData.moods" :key="index">
            <a target="_blank" href="">{{ item.name }}</a
            ><span>{{ item.num }}</span>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'LevelList',
  components: {},
  props: {
    activeIndex: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      data: {
        week: {
          deep: [
            { name: '1北京大学历史学系马斌', num: '12423' },
            { name: '知名台湾歌手邱晨', num: '1242' },
            { name: '北京大历史学系马斌', num: '1223' },
            { name: '知名台歌手邱晨', num: '122' },
            { name: '北京大学学系马斌', num: '1223' },
            { name: '知名', num: '124' }
          ],
          love: [
            { name: '1北京大学历史学系马斌', num: '12423' },
            { name: '知名台湾歌手邱晨', num: '1242' },
            { name: '大历史学系马斌', num: '1223' },
            { name: '台歌手邱晨', num: '122' },
            { name: '大学学系马斌', num: '1223' },
            { name: '知名台湾邱晨', num: '124' }
          ],
          moods: [
            { name: '1北京大学历史学系马斌', num: '12423' },
            { name: '知名台湾歌手邱晨', num: '1242' },
            { name: '北京学系马斌', num: '1223' },
            {
              name: '知名邱晨',
              num: '122'
            },
            { name: '北京系马斌', num: '1223' },
            { name: '知名台湾邱晨', num: '124' }
          ]
        },
        month: {
          deep: [
            { name: '3北京大学历史学系', num: '12423' },
            { name: '知名台湾歌手邱晨', num: '1242' },
            { name: '北京大历史学系马斌', num: '1223' },
            { name: '知名台歌手邱晨', num: '122' },
            { name: '北京大学学系马斌', num: '1223' },
            { name: '知名台湾邱晨', num: '124' }
          ],
          love: [
            { name: '3北京大学历史学系马斌', num: '12423' },
            { name: '知名台湾歌手邱晨', num: '1242' },
            { name: '大历史学系马斌', num: '1223' },
            {
              name: '台歌手邱晨',
              num: '122'
            },
            { name: '大学学系马斌', num: '1223' },
            { name: '知名台湾邱晨', num: '124' }
          ],
          moods: [
            { name: '3北京大学历史学系马斌', num: '12423' },
            { name: '知名台湾歌手邱晨', num: '1242' },
            { name: '北京学系马斌', num: '1223' },
            { name: '知名邱晨', num: '122' },
            { name: '北京系马斌', num: '1223' },
            { name: '知名台湾邱晨', num: '124' }
          ]
        },
        year: {
          deep: [
            { name: '2北京大学历史学系马斌', num: '12423' },
            { name: '知名台湾歌手邱晨', num: '1242' },
            { name: '北京大历史学系', num: '1223' },
            { name: '知名台歌手邱晨', num: '122' },
            { name: '北京大学学系马斌', num: '1223' },
            { name: '知名台湾邱晨', num: '124' }
          ],
          love: [
            { name: '2北京大学历史学系马斌', num: '12423' },
            { name: '知名台湾歌手邱晨', num: '1242' },
            { name: '大历史学系马斌', num: '1223' },
            {
              name: '台歌手邱晨',
              num: '122'
            },
            { name: '大学学系马斌', num: '1223' },
            { name: '知名台湾邱晨', num: '124' }
          ],
          moods: [
            { name: '2北京大学历史学系马斌', num: '12423' },
            { name: '知名台湾歌手邱晨', num: '1242' },
            { name: '北京学系马斌', num: '1223' },
            { name: '知名邱晨', num: '122' },
            { name: '北京系马斌', num: '1223' },
            { name: '知名台湾邱晨', num: '124' }
          ]
        }
      }
    }
  },
  computed: {
    showData () {
      if (this.activeIndex === 'week') {
        return this.data.week
      } else if (this.activeIndex === 'month') {
        return this.data.month
      } else {
        return this.data.year
      }
    }
  },
  watch: {
  },
  created () {},
  mounted () {},
  methods: {}
}

</script>
<style scoped lang="less">
@import './home-data-list';
.list-box {
  display: block;
  overflow: hidden;
  h4 {
    font-size: 18px;
    color: #999;
    margin-bottom: 2px;
  }
  ul {
    background: url(~@/assets/images/num.png) left 7px no-repeat;
    padding-left: 20px !important;
    border-right: 1px dashed #e0e1e0;
    li {
      height: 28px;
      line-height: 28px;
      a {
        width: 90px;
      }
    }
  }
  .el-col:last-child ul {
    border-right: none;
  }
}
</style>
