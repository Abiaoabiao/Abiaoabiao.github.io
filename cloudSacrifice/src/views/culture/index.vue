<template>
  <div>
    <div class="title">{{ articleInfo.title }}</div>
    <div class="content">{{ articleInfo.content }}</div>
  </div>
</template>
<script>
import { cultureById } from '@/api/article'
export default {
  name: 'Culture',
  components: {},
  props: {
    articleId: {
      type: [Number, String],
      require: true
    }
  },
  data () {
    return {
      articleInfo: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getArticle()
  },
  mounted () {},
  methods: {
    async getArticle () {
      try {
        const { data: res } = await cultureById(this.articleId)
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.articleInfo = res.content
      } catch (error) {
        return this.$message.error('文章获取失败！')
      }
    }
  }
}
</script>
<style scoped lang="less">
.title {
  font-size: 40px;
  line-height: 56px;
  color: #333;
  font-weight: 500;
  margin-bottom: 24px;
}
.content {
  box-sizing: border-box;
  padding: 18px 30px;
  font-size: 20px;
  line-height: 32px;
  color: #333;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  word-break: break-all;
}
</style>
