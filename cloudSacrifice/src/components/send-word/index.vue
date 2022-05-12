<template>
  <div class="words">
    <textarea
      type="text"
      placeholder="我想对Ta说的话"
      v-model.trim="word"
    ></textarea>
    <button :loading="sendWordLoading" @click="sendWord">发表追思留言</button>
  </div>
</template>
<script>
import { pubContent } from '@/api/article'
export default {
  name: 'SendWord',
  components: {},
  props: {
    hallId: {
      type: [Number, String],
      require: true
    }
  },
  data () {
    return {
      word: '',
      sendWordLoading: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    isvalid (val) {
      if (!val) {
        this.$message({
          message: '填写好留言了，再点击发表追思留言哦！',
          type: 'warning'
        })
        return
      }
      if (val.length > 50) {
        this.$message({
          message: '字数不要超过50哦！',
          type: 'warning'
        })
      } else {
        this.$message.success('发表成功')
      }
    },
    async sendWord () {
      this.sendWordLoading = true
      try {
        const data = {
          content: this.word,
          hallId: this.hallId,
          type: 0
        }
        const { data: res } = await pubContent(data)
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        console.log(res)
        this.isvalid(this.word)
        this.$emit('changeUpdate')
        this.word = ''
      } catch (error) {
        this.$message.error('发表文章失败！')
      }
      this.sendWordLoading = false
    }
  }
}
</script>
<style scoped lang="less"></style>
