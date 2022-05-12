<template>
  <el-row :gutter="15" class="home-data">
    <el-col :md="18">
      <el-row :gutter="15">
        <el-col :md="6">
          <div class="found-box">
            <ul class="data-tab">
              <li>最新建馆</li>
            </ul>
            <found-list></found-list>
          </div>
        </el-col>
        <el-col :md="18"
          ><div class="level-box">
            <ul class="data-tab">
              <li>纪念馆指数榜</li>
              <li
                :class="{ active: activeIndex === 'year' }"
                @click="activeIndex = 'year'"
              >
                年排行
              </li>
              <li
                :class="{ active: activeIndex === 'month' }"
                @click="activeIndex = 'month'"
              >
                月排行
              </li>
              <li
                :class="{ active: activeIndex === 'week' }"
                @click="activeIndex = 'week'"
              >
                周排行
              </li>
            </ul>
            <level-list :activeIndex="activeIndex"></level-list></div
        ></el-col>
      </el-row>
      <el-row class="create-row">
        <img src="@/assets/images/abs0.png" alt="" />
        <div class="create-box">
          <create-hall class="createBtn"></create-hall>
        </div>
      </el-row>
    </el-col>
    <el-col :md="6"
      ><div class="visit-box">
        <ul class="data-tab">
          <li>最新拜访记录</li>
        </ul>
        <visit-list></visit-list></div
    ></el-col>
  </el-row>
</template>
<script>
import FoundList from './found-list.vue'
import LevelList from './level-list.vue'
import VisitList from './visit-list.vue'
import CreateHall from '@/components/create-hall'
export default {
  name: 'HomeData',
  components: {
    FoundList,
    VisitList,
    LevelList,
    CreateHall
  },
  props: {},
  data () {
    return {
      activeIndex: 'week'
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
.home-data{
  margin-top: 15px;
}
.found-box,
.level-box,
.visit-box {
  border: 1px solid #7bd4c1;
  border-bottom-width: 3px;
  background-color: #b9e7e0;
}
.data-tab {
  line-height: 45px;
  height: 45px;
  li {
    color: #555;
    padding: 0 15px;
  }
  li:not(:first-child) {
    float: right;
    padding: 10px 15px;
    font-size: 14px;
    line-height: 15px;
    margin-top: 10px;
  }
  li:first-child {
    float: left;
    line-height: 45px;
    background-color: #fff;
    font-size: 18px;
  }
}
.active {
  background-color: #fff;
}
.list {
  padding: 10px 5px;
  background-color: #fff;
}
.create-row {
  margin-top: 15px;
  position: relative;
  img {
    width: 100%;
  }
  .create-box {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .createBtn {
      position: relative;
      transform: translateY(35%);
    }
  }
}
</style>
