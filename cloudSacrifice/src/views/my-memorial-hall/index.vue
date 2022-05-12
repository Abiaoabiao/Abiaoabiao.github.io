<template>
  <div class="my-memorial-hall">
    <div class="tab">
      <ul>
        <li
          v-for="(item, index) in tabData"
          :key="index + Math.random()"
          @click="isActive = index"
          :class="{ active: isActive === index }"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <el-card>
      <el-row type="flex" justify="space-between" class="hall-header">
        <h4>{{ showTitle }}</h4>
        <create-hall></create-hall>
      </el-row>
      <el-row :gutter="20"><hall-list></hall-list> </el-row>
    </el-card>
    <!-- <el-row :gutter="20">
      <el-col :span="4" class="tab">
        <div>
          <ul>
            <li
              v-for="(item, index) in tabData"
              :key="index + Math.random()"
              @click="isActive = index"
              :class="{ active: isActive === index }"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="20">
        <el-card>
          <el-row type="flex" justify="space-between" class="hall-header">
            <h4>{{ showTitle }}</h4>
            <create-hall></create-hall>
          </el-row>
          <el-row :gutter="20"> <hall-list></hall-list> </el-row>
        </el-card>
      </el-col>
    </el-row> -->
  </div>
</template>
<script>
import HallList from './components/hall-list.vue'
import CreateHall from '@/components/create-hall'
export default {
  name: 'MyMemorialHall',
  components: {
    CreateHall,
    HallList
  },
  props: {},
  data () {
    return {
      isActive: 0,
      tabData: ['全部馆', '我创建的馆', '我关注的馆']
    }
  },
  computed: {
    showTitle () {
      const index = this.isActive
      return this.tabData[index]
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style scoped lang="less">
@maincolor: #3fc2a6;
.hall-header {
  display: flex;
  align-items: center;
  h4 {
    font-size: 19px;
    font-weight: 500;
  }
}
.el-card {
  flex: 1;
  margin-left: 20px;
}
.my-memorial-hall {
  display: flex;
  justify-content: space-between;
  .tab {
    min-width: 135px;
    ul {
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      li {
        text-align: center;
        height: 33px;
        font-size: 16px;
        line-height: 33px;
        color: #666;
      }
      .active {
        background-color: @maincolor;
        color: #fff;
      }
      li:hover {
        background-color: @maincolor;
        color: #fff;
      }
    }
  }
}
</style>
