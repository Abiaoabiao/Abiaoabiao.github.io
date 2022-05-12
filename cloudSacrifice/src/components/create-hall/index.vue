<template>
  <div class="create-hall">
    <button @click="isShowCreatePop = true" class="createBtn">
      {{ haveUser ? '创建纪念馆' : '快速创建纪念馆' }}
    </button>
    <!-- 创建纪念馆的弹框 -->
    <el-dialog
      width="800px"
      :visible.sync="isShowCreatePop"
      :append-to-body="true"
      v-if="isShowCreatePop"
      @close='isShowCreatePop=false'
    >
      <span>为逝去的挚爱亲人创建一方永恒净土</span>
      <create-form :isQuick="!haveUser"></create-form>
    </el-dialog>
  </div>
</template>
<script>
import CreateForm from './components/create-form.vue'
export default {
  name: 'CreateHall',
  components: {
    CreateForm
  },
  props: {},
  data () {
    return {
      isShowCreatePop: false
    }
  },
  computed: {
    haveUser () {
      if (this.$store.state.user) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style scoped lang="less">
.create-hall {
  .createBtn {
    border-radius: 3px;
    padding: 10px 25px;
    background-color: #ffc107;
    color: #fff;
    font-size: 16px;
  }
  .createBtn:hover {
    background-color: #ffbe53;
  }
}
</style>
