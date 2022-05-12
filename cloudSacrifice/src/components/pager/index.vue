<template>
  <!-- 只有总页数大于1时才显示 -->
  <div class="pager-container" v-if="pageNumber > 1">
    <a @click="handleClick(1)" :class="{ disabled: current === 1 }">
      |&lt;&lt;
    </a>
    <a @click="handleClick(current - 1)" :class="{ disabled: current === 1 }">
      &lt;&lt;
    </a>
    <a
      @click="handleClick(n)"
      v-for="(n, i) in numbers"
      :key="i"
      :class="{ active: n === current }"
    >
      {{ n }}
    </a>

    <a
      @click="handleClick(current + 1)"
      :class="{ disabled: current === pageNumber }"
    >
      &gt;&gt;
    </a>
    <a
      @click="handleClick(pageNumber)"
      :class="{ disabled: current === pageNumber }"
    >
      &gt;&gt;|
    </a>
  </div>
</template>

<style lang="less" scoped>
@danger: #cc3600; // 危险、错误
@primary: #6b9eee; // 主色调、链接
@words: #373737; // 大部分文字、深色文字
@lightWords: #999; // 少部分文字、浅色文字
@warn: #dc6a12; // 警告
@success: #7ebf50; // 成功
@gray: #b4b8bc; // 灰色
@dark: #202020; // 深色

.pager-container {
  display: flex;
  justify-content: center;
  margin: 50px 0 20px;
  a {
    display: block;
    background: #f4f4f5;
    width: 30px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    color: #606266;
    margin: 0 6px;
    cursor: pointer;
    &:hover {
      color: @success;
    }
    &.disabled {
      color: @lightWords;
      cursor: not-allowed;
    }
    &.active {
      color: @danger;
      font-weight: bold;
      cursor: text;
    }
  }
}
</style>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 6
    },
    visibleNumber: {
      type: Number,
      default: 10
    }
  },
  computed: {
    // 总页数
    pageNumber () {
      return Math.ceil(this.total / this.limit)
    },
    // 得到显示的最小数字
    visibleMin () {
      let min = this.current - Math.floor(this.visibleNumber / 2)
      if (min < 1) {
        min = 1
      }
      return min
    },
    visibleMax () {
      let max = this.visibleMin + this.visibleNumber - 1
      if (max > this.pageNumber) {
        max = this.pageNumber
      }
      return max
    },
    numbers () {
      const nums = []
      for (let i = this.visibleMin; i <= this.visibleMax; i++) {
        nums.push(i)
      }
      return nums
    }
  },
  methods: {
    handleClick (newPage) {
      if (newPage < 1) {
        newPage = 1
      }
      if (newPage > this.pageNumber) {
        newPage = this.pageNumber
      }
      if (newPage === this.current) {
        return
      }
      // 抛出一个事件
      this.$emit('pageChange', newPage)
    }
  }
}
</script>
