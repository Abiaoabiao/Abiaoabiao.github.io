<template>
  <div v-if="length === 0" class="empty">
    <empty></empty>
  </div>
  <div v-else-if="type === 1">
    <ul>
      <li v-for="item in articleData" :key="item.id">
        <a
          ><div class="article-item">
            <div class="title">{{ item.title }}</div>
            <div class="info">
              <span
                >作者:<find-user :userId="item.userId" :type="0"></find-user
              ></span>
              <!-- <span>浏览:0</span> -->
              <span>发布日期:{{ item.createTime | relativeTime }}</span>
            </div>
            <div class="desc text-three-line" v-html="item.content"></div></div
        ></a>
      </li>
    </ul>
  </div>
  <div v-else-if="type === 0" class="word-box">
    <div v-for="item in articleData" :key="item.id" class="word-item">
      <div class="content">
        <find-user :userId="item.userId" :type="1"></find-user>
        <span>{{ item.content }}</span>
      </div>
      <span>{{ item.createTime | relativeTime }} </span>
    </div>
  </div>
</template>
<script>
import FindUser from './components/find-user.vue'
import { hallAriticles } from '@/api/article'
import Empty from '@/components/empty'
export default {
  name: 'ArticleItem',
  components: {
    FindUser,
    Empty
  },
  props: {
    hallId: {
      type: Number,
      require: true
    },
    value: {
      type: Boolean,
      default: false
    },
    isShow4: {
      type: Boolean,
      default: false
    },
    type: {
      type: Number,
      require: true
    }
  },
  data () {
    return {
      articleData: [],
      length: 0
    }
  },
  computed: {},
  watch: {
    value (newValue) {
      if (newValue) {
        this.getArticle()
        this.$emit('input', false)
      } else {
        console.log(newValue)
      }
    }
  },
  created () {
    this.getArticle()
  },
  mounted () {},
  methods: {
    async getArticle () {
      try {
        const { data: res } = await hallAriticles(this.hallId)
        console.log(res)
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        res.data = res.data.filter((item) => item.type === this.type)
        this.articleData = res.data.reverse()
        if (this.isShow4) {
          this.articleData = this.articleData.slice(0, 4)
        }
        this.length = res.data.length
      } catch (error) {
        console.log(error)
        this.$message.error('获取文章列表失败！')
      }
    }
  }
}
</script>
<style scoped lang="less">
.empty {
  height: 100%;
}
.word-box{
  height: 94px;
  overflow: hidden;
}
.word-item {
  height: 45px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 12px;
  box-sizing: border-box;
  background: #dceeea;
  margin-bottom: 4px;
  .content {
    display: flex;
    align-items: center;
    span {
      margin-left: 8px;
      font-size: 16px;
      line-height: 16px;
      color: #333;
    }
  }
  span {
    font-size: 14px;
    line-height: 14px;
    color: #999;
  }
}
ul {
  display: flex;
  flex-wrap: wrap;
  li {
    box-sizing: border-box;
    padding: 10px 20px;
    background: #dceeea;
    margin-bottom: 16px;
    width: 100%;
    height: 120px;
    .article-item {
      .title {
        font-size: 16px;
        line-height: 20px;
        color: #333;
        font-weight: bold;
      }
      .info {
        span {
          font-size: 14px;
          line-height: 14px;
          color: #999;
          margin-right: 10px;
        }
      }
      .desc {
        font-size: 14px;
        line-height: 20px;
        color: #333;
      }
      .text-three-line {
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
        white-space: normal !important;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }
    }
  }
}
</style>
