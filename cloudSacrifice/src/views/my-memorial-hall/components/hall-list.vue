<template>
  <div>
    <el-col
      class="hall-content-col"
      :xs="24"
      :sm="12"
      :md="8"
      v-for="item in hallData"
      @click.native="toHallPage(item.identifier)"
      :key="item.id"
      ><div class="hall">
        <span class="iconfont icon-xiugai1"></span>
        <img src="@/assets/images/deadHead.png" alt="" />
        <div class="hall-info">
          <h4>{{ item.title }}</h4>
          <span class="special">-</span>
          <p>创建时间：{{ item.createTime | dateFormat }}</p>
          <p class="hall-id">馆号：{{ item.identifier }}</p>
          <p class="hall-type">
            类型：<el-tag type="warning" size="mini">{{ item.type }}</el-tag>
          </p>
          <!-- <div class="hall-info-data">
            <span class="iconfont icon-huo"
              ><span class="special">29</span></span
            >
            <span class="iconfont icon-chakan"
              ><span class="special">8</span></span
            >
          </div> -->
        </div>
      </div></el-col
    >
  </div>
</template>
<script>
import { myHall } from '@/api/hall'
export default {
  name: 'HallList',
  components: {},
  props: {},
  data () {
    return {
      hallData: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getHallData()
  },
  mounted () {},
  methods: {
    async getHallData () {
      try {
        const { data: res } = await myHall()
        if (res.code !== 0) {
          this.$message.error(res.msg)
        }
        res.data.forEach((item) => {
          if (item.type === 0) {
            item.type = '私人馆'
          } else if (item.type === 1) {
            item.type = '名人馆'
          } else if (item.type === 2) {
            item.type = '恩师馆'
          }
        })
        this.hallData = res.data
      } catch (error) {
        this.$message.error('获取数据失败！')
      }
    },
    toHallPage (path) {
      console.log(111)
      this.$router.push(`/memorialHall/${path}`)
    }
  }
}
</script>
<style scoped lang="less">
@maincolor: #3fc2a6;
.hall-content-col {
  margin-top: 10px;
  .hall {
    position: relative;
    border-radius: 3px;
    padding: 12px 0;
    // background-color: #ffdba027;
    background-color: #8de1cd1a;
    display: flex;
    justify-content: start;
    .icon-xiugai1 {
      position: absolute;
      right: 8px;
      top: 8px;
      color: @maincolor;
    }
    img {
      height: 140px;
      margin: 0 15px 0 10px;
    }
    .hall-info {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      h4 {
        font-size: 16px;
        margin: 16px 0px 4px;
      }
      p {
        font-size: 12px;
        color: #333;
      }
      .special {
        font-size: 12px;
        color: #999;
      }
      .hall-id {
        margin: 6px 0;
      }
      .hall-info-data {
        display: flex;
        justify-content: space-between;
        .icon-huo,
        .icon-chakan {
          width: 25px;
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
