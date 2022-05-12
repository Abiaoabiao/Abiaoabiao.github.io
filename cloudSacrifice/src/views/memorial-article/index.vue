<template>
  <div class="memorial-article">
    <div class="article">
      <div class="header">
        <span class="title"
          >追思文章·<span class="green">超越时空的情感</span></span
        >
        <!-- <el-button>快速发表纪念文章</el-button> -->
      </div>
      <article-item
        :hallId="hallId"
        v-model="isUpdate"
        :type="1"
      ></article-item>
    </div>
    <div class="send-article">
      <div class="header">
        <span class="title">快速发表·<span class="green">纪念文章</span></span>
      </div>
      <el-form
        class="article-form"
        ref="addArticleFormRef"
        :model="addArticleForm"
        :rules="addArticleRules"
        label-width="0px"
      >
        <el-form-item prop="title">
          <el-input
            v-model="addArticleForm.title"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>
        <el-form-item prop="content"
          ><quill-editor
            :options="editorOption"
            v-model="addArticleForm.content"
            @blur="questiononblur"
          ></quill-editor>
        </el-form-item>
        <el-form-item class="btn-box">
          <el-button @click="onSubmit" :loading="pubLoading"
            >快速发表</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import ArticleItem from '@/components/article-item'
import { pubContent } from '@/api/article'
export default {
  name: 'MemorialArticle',
  components: {
    ArticleItem
  },
  props: {
    hallPath: { type: String, require: true }
  },
  data () {
    return {
      addArticleForm: {
        title: '',
        content: ''
      },
      addArticleRules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入标题' }]
      },
      editorOption: {
        placeholder: '请输入内容',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 切换按钮
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }], // 自定义按钮值
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ color: [] }, { background: [] }],
            // 具有主题默认值的下拉列表
            [{ align: [] }],
            ['clean'],
            ['image']
          ]
        }
      },
      pubLoading: false,
      isUpdate: false
    }
  },
  computed: {
    hallId () {
      return parseInt(this.hallPath.slice(1))
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    questiononblur () {
      this.$refs.addArticleFormRef.validateField('content')
    },
    onSubmit () {
      this.$refs.addArticleFormRef.validate(async (vaild) => {
        if (!vaild) {
          return this.$message({
            message: '信息格式填写正确了，再点击快速发表哦！',
            type: 'warning'
          })
        }
        this.pubLoading = true
        try {
          const data = {
            content: this.addArticleForm.content,
            hallId: this.hallId,
            title: this.addArticleForm.title,
            type: 1
          }
          const { data: res } = await pubContent(data)
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          console.log(res)
          this.$message.success('发表成功')
          this.isUpdate = true
          this.$refs.addArticleFormRef.resetFields()
        } catch (error) {
          this.$message.error('发表文章失败！')
        }
        this.pubLoading = false
      })
    }
  }
}
</script>
<style scoped lang="less">
@maincolor: #3fc2a6;
.memorial-article {
  > div {
    padding: 20px 20px 20px 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin-top: 20px;
  }
  > div:first-child {
    margin-top: 0;
  }
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  .title {
    font-size: 19px;
    line-height: 19px;
    color: #333;
    font-weight: bold;
  }
  .green {
    cursor: pointer;
    color: #04b194;
  }
}
.article-form {
  width: 1060px;
  margin: 0 auto;
  /deep/.ql-editor {
    height: 240px !important;
  }
  /deep/.btn-box {
    .el-form-item__content {
      display: flex;
      justify-content: center;
    }
  }
}
.el-button {
  background-color: #04b194;
  border-color: #04b194;
  color: #fff;
  font-size: 16px;
  padding: 15px 20px;
}
.el-button:hover {
  background-color: @maincolor;
  border-color: @maincolor;
}
</style>
