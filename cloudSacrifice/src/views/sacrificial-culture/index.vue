<template>
  <div class="culture">
    <culture-list :type="5"></culture-list>
    <el-button  type="primary" @click="isShowAriticlePop = true"
      >快速添加文章</el-button
    >
    <!-- 添加文章的弹框 -->
    <el-dialog title="提示" :visible.sync="isShowAriticlePop" width="80%">
      <el-form ref="addArticleRef" :model="addArticle" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="addArticle.title"></el-input>
        </el-form-item>
        <el-form-item label="type">
          <el-input v-model="addArticle.type"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="addArticle.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加文章</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { pubContent } from '@/api/article'
import CultureList from '@/components/culture-list'
export default {
  name: 'SacrificialCulture',
  components: {
    CultureList
  },
  props: {},
  data () {
    return {
      isShowAriticlePop: false,
      addArticle: {
        title: '',
        type: 5,
        content: ''
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit () {
      try {
        const res = await pubContent(this.addArticle)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style scoped lang="less">
.culture {
  width: 100%;
  padding-top: 10px;
}
</style>
