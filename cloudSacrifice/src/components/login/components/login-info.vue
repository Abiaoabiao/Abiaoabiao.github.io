<template>
  <div class="login-pop">
    <!-- 用户信息 -->
    <el-collapse-transition>
      <div
        class="pop-box"
        @mouseover="$emit('input', true)"
        @mouseout="$emit('input', false)"
        v-show="value"
      >
        <div class="content">
          <div class="tips">
            <span>再忙，也要记得祭祀亲人哦~</span>
            <img src="@/assets/images/quit.png" class="quitBtn" @click="quit" />
          </div>
          <div class="userInfo">
            <div class="img" @click="isShowImgPop = true">
              <img :src="head" />
            </div>
            <h4>{{ user.nickname }}</h4>
          </div>
          <div class="more-memorial">
            我管理的纪念馆
            <a @click="$router.push('/myMemorialHall')">更多></a>
          </div>
          <div class="set">
            <a @click="isShowPersonPop = true">
              <img src="@/assets/images/person.png" />
              <div>个人设置</div>
            </a>
            <a>
              <img src="@/assets/images/follow.png" />
              <div>我的关注</div>
            </a>
            <a>
              <img src="@/assets/images/news.png" />
              <div>消息</div>
            </a>
            <a>
              <img src="@/assets/images/set.png" />
              <div>账号设置</div>
            </a>
          </div>
        </div>
      </div>
    </el-collapse-transition>
    <!-- 个人设置弹框 -->
    <el-dialog
      title="个人信息"
      :visible.sync="isShowPersonPop"
      width="600px"
      @close="closePersonPop"
      v-if="isShowPersonPop"
    >
      <!-- 展示个人信息 -->
      <el-descriptions :column="2">
        <el-descriptions-item label="姓名"
          >{{ user.name | handelNull }}
        </el-descriptions-item>
        <el-descriptions-item label="邮箱"
          >{{ user.email | handelNull }}
        </el-descriptions-item>
        <el-descriptions-item label="昵称"
          >{{ user.nickname | handelNull }}
        </el-descriptions-item>
        <el-descriptions-item label="手机号"
          >{{ user.phone | handelNull }}
        </el-descriptions-item>
        <el-descriptions-item label="QQ"
          >{{ user.qq | handelNull }}
        </el-descriptions-item>
        <el-descriptions-item label="居住地"
          >{{ user.habitation | handelNull }}
        </el-descriptions-item>
      </el-descriptions>
      <!-- 修改个人信息是否展示的控件 -->
      <el-divider @click="isShowChange = !isShowChange">
        修改个人信息
      </el-divider>
      <!-- 修改个人信息 -->
      <change-person
        v-show="isShowChange"
        :user="user"
        @close="closePersonPop"
      ></change-person>
    </el-dialog>
    <!-- 修改头像弹框 -->
    <el-dialog
      title="修改头像"
      :visible.sync="isShowImgPop"
      width="700px"
      center
    >
      <cropper-image :initialImg="head" @close="isShowImgPop = false">
      </cropper-image>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import ChangePerson from './change-person.vue'
import CropperImage from '@/components/cropper-image'
export default {
  name: 'LoginInfo',
  components: {
    ChangePerson,
    CropperImage
  },
  props: {
    value: {
      type: Boolean,
      require: true
    },
    head: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      isShowPersonPop: false,
      isShowImgPop: false,
      isShowChange: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    quit () {
      this.$confirm('确认退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.commit('setUser', null)
          this.$store.commit('setToken', null)
          this.$message({ type: 'success', message: '退出成功!' })
        })
        .catch(() => {
          this.$message({ type: 'info', message: '已取消退出' })
        })
    },
    closePersonPop () {
      this.isShowChange = false
      this.isShowPersonPop = false
    }
  }
}
</script>
<style scoped lang="less">
.login-pop {
  position: relative;
  .pop-box {
    position: absolute;
    right: 0px;
    top: -5px;
    z-index: 99;
    width: 360px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
.content {
  margin: 30px;
  .tips {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
  }
  .userInfo {
    text-align: center;
    margin-top: 35px;
    .img {
      margin: 0 auto;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      border: 4px solid #fff;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .img:hover {
      border: 4px solid #f8b678;
    }
    h4 {
      font-weight: 700;
      font-size: 18px;
    }
  }
  .more-memorial {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px dashed #ccc;
    margin-top: 20px;
    padding: 18px 0;
    font-size: 16px;
    a {
      font-size: 12px;
      color: #999;
    }
  }
  .set {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    text-align: center;
    div {
      line-height: 14px;
    }
  }
}
// 修改个人信息弹窗的样式
.el-descriptions {
  padding-left: 40px;
}
.el-dialog__body {
  padding: 20px 20px;
}
.el-divider__text {
  color: #5cb6ff;
  cursor: pointer;
}
/deep/.preview {
  border-radius: 50%;
}
</style>
