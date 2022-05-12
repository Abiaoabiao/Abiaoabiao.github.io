<template>
  <div class="culture-list">
    <ul class="culture-item">
      <li v-for="item in cultureData" :key="item.id" @click="$router.push(`/culture/${item.id}`)">
        <!-- 有图片就显示 备用 -->
        <img v-show="item.img" src="@/assets/images/csimg.png" alt="" />
        <div class="item-content">
          <div class="title text-two-line">{{ item.title }}</div>
          <div class="desc text-two-line">
            {{ item.content }}
          </div>
          <div class="info">发布时间:{{ item.createTime | dateFormat }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { cultureAriticles } from '@/api/article'
export default {
  name: 'CultureList',
  components: {},
  props: {
    type: {
      type: Number,
      require: true
    }
  },
  data () {
    return {
      cultureData: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getCultureList()
  },
  mounted () {},
  methods: {
    async getCultureList () {
      try {
        const { data: res } = await cultureAriticles(this.type)
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.cultureData = res.data
        console.log(res)
      } catch (error) {
        return this.$message.error('文章获取失败！')
      }
    }
  }
}
</script>
<style scoped lang="less">
.culture-item {
  li {
    width: 100%;
    display: flex;
    padding: 22px 18px;
    box-sizing: border-box;
    margin-bottom: 14px;
    border-radius: 6px;
    background-color: #dceeea52;
    transition: all 0.5s;
    overflow: hidden;
    box-shadow: none;
    img {
      width: 211px;
      height: 150px;
      margin-right: 18px;
    }
    .item-content {
      height: 150px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 20px;
        line-height: 28px;
        color: #111;
        font-weight: bold;
      }
      .desc {
        font-size: 16px;
        line-height: 22px;
        color: #333;
      }
      .info {
        font-size: 14px;
        color: #ccc;
        line-height: 14px;
      }
    }
  }
}

.culture-item li:hover & {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}
.text-two-line {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: normal !important;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
