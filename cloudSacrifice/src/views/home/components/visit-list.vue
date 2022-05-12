<template>
  <div class="list">
    <ul>
      <li
        v-for="(item, index) in visitData"
        :key="index + Math.random()"
        :class="{ come: !isFirst && index === 0 }"
      >
        <a>{{ item.name }}</a>
        {{ item.time | relativeTime }} 给
        <a target="_blank"> {{ item.deadname }} </a> 敬献了
        <span>{{ item.gift }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'VisitList',
  components: {},
  props: {},
  data () {
    return {
      visitData: [
        {
          id: 1,
          name: '那是你福',
          time: '2022-03-26 12:00:00',
          deadname: '李敏至',
          gift: '白色莲花灯'
        },
        {
          name: '羊子',
          time: '2022-03-26 12:00:00',
          deadname: '李敏至',
          gift: '蝴蝶'
        },
        {
          name: '追风的女儿',
          time: '2022-03-26 18:00:00',
          deadname: '李敏至',
          gift: '鲜美红嫩草莓'
        },
        {
          name: '羊子1',
          time: '2022-03-26 12:00:00',
          deadname: '李敏至',
          gift: '蝴蝶'
        },
        {
          name: '追风的女儿',
          time: '2022-03-26 18:00:00',
          deadname: '李敏至',
          gift: '鲜美红嫩草莓'
        },

        {
          name: '羊1',
          time: '2022-03-26 10:00:00',
          deadname: '李敏至',
          gift: '蝴蝶'
        },
        {
          name: '羊月1',
          time: '2022-03-25 12:00:00',
          deadname: '李敏至',
          gift: '蝴蝶'
        },
        {
          name: '追风的女儿',
          time: '2022-03-26 18:00:00',
          deadname: '李敏至',
          gift: '鲜美红嫩草莓'
        },

        {
          name: '羊月1',
          time: '2022-03-25 12:00:00',
          deadname: '李敏至',
          gift: '蝴蝶'
        },
        {
          name: '那是你福',
          time: '2022-03-26 12:00:00',
          deadname: '李敏至',
          gift: '白色莲花灯'
        },

        {
          name: '羊月1',
          time: '2022-03-25 12:00:00',
          deadname: '李敏至',
          gift: '蝴蝶'
        },
        {
          name: '那是你福',
          time: '2022-03-26 12:00:00',
          deadname: '李敏至',
          gift: '白色莲花灯'
        }
      ], // 是否是第一次加载
      isFirst: true
    }
  },
  computed: {},
  watch: {},
  created () {
    this.changeVisitData()
  },
  mounted () {},
  methods: {
    changeVisitData () {
      setInterval(() => {
        this.isFirst = true
        const lastData = this.visitData.pop()
        this.visitData.unshift(lastData)
        this.isFirst = false
      }, 3000)
    }
  }
}
</script>
<style scoped lang="less">
@import './home-data-list';
.come {
  animation: unfold 1s ease forwards;
}
@keyframes unfold {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0%);
  }
}
.list {
  ul {
    height: 403px;
    overflow: hidden;
    li {
      font-size: 14px;
      border-bottom: 1px dotted #e5e5e5;
      padding-bottom: 5px;
      margin-bottom: 5px;
      a {
        float: none;
      }
      span {
        float: none;
        font-size: 14px;
      }
    }
  }
}
</style>
