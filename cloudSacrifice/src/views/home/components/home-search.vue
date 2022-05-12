<template>
  <div class="home">
    <div class="home-search" v-if="key && searchData">
      <h4>已为您搜索“{{ key }} ”出结果 ：共</h4>
      <strong>{{ searchData.totalCount }} </strong>
      相关记录
    </div>
    <div class="home-search" v-if="!key">
      <h4>未查询到关键词<strong>key</strong>无搜索结果</h4>
    </div>
    <div class="page" v-if="searchData">
      <el-row :gutter="15">
        <el-col
          class="hall-content-col"
          :xs="24"
          :sm="12"
          :md="8"
          v-for="item in searchData.list"
          @click.native="toHallPage(item.hall.identifier)"
          :key="item.id"
          ><div class="hall">
            <span class="iconfont icon-xiugai1"></span>
            <img src="@/assets/images/deadHead.png" alt="" />
            <div class="hall-info">
              <h4 v-html="item.hall.title"></h4>
              <span class="special">-</span>
              <p>创建时间：{{ item.hall.createTime | dateFormat }}</p>
              <p class="hall-id">馆号：{{ item.hall.identifier }}</p>
              <p class="hall-type">
                类型：<el-tag type="warning" size="mini">{{
                  type(item.hall.type)
                }}</el-tag>
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
      </el-row>
    </div>
    <Pager
      v-if="searchData"
      :total="searchData.totalCount"
      :current="searchData.currPage"
      @pageChange="handlePageChange($event)"
    ></Pager>
  </div>
</template>

<script>
import Pager from '@/components/pager'
import { mapState } from 'vuex'
export default {
  name: 'HomeSearch',
  components: { Pager },

  data () {
    return {
      page: 1,
      limit: 6
    }
  },
  computed: {
    ...mapState(['key', 'searchData'])
  },
  created () {},
  mounted () {},
  methods: {
    toHallPage (path) {
      console.log(111)
      this.$router.push(`/memorialHall/${path}`)
    },
    handlePageChange (newPage) {
      this.$store.dispatch('fetchKey', {
        key: this.key,
        page: newPage,
        limit: this.limit
      })
    },
    type (typeId) {
      if (typeId === 0) {
        return '私人馆'
      } else if (typeId === 1) {
        return '名人馆'
      } else {
        return '恩师馆'
      }
    }
  }
}
</script>

<style scoped lang="less">
.home {
  .home-search {
    font-size: 18;
    display: flex;
    margin-right: 10px;
    margin-top: 20px;
  }
}
strong {
  color: #a94442;
}

.page {
  width: 100%;
  // box-sizing: border-box;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
}
@maincolor: #3fc2a6;
.hall-content-col {
  margin-top: 10px;
  .hall {
    box-sizing: border-box;

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
