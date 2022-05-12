<template>
  <div class="layout-page">
    <div class="memorial-background">
      <div class="memorial-hall">
        <header class="hall-header">
          <img src="@/assets/images/logo.png" alt="" />
          <layout-menu></layout-menu>
          <login></login>
        </header>
        <div class="primary-header">
          <div class="primary">
            <div
              class="head"
              @click="handleImgPop"
              :style="{ backgroundImage: 'url(' + head + ')' }"
            >
              <img src="@/assets/images/headBox.png" alt="" />
            </div>
            <div class="name">{{ hallInfo.title }}</div>
            <div class="desc-box">
              <span
                >类型:&nbsp;&nbsp;<el-tag type="success" size="mini">{{
                  hallInfo.type
                }}</el-tag></span
              >
              <span>馆号:{{ hallInfo.identifier }}</span>
              <span>馆长:{{ email }}</span>
            </div>
            <div class="level">
              <div
                class="level-item"
                v-for="(item, index) in levelData"
                :key="index"
              >
                <div
                  class="heart"
                  :style="{ backgroundPosition: item.location }"
                >
                  <p :style="{ color: item.color }">深情指数<br />70</p>
                </div>
                <div>
                  <img
                    :src="
                      require('@/assets/images/star_' + (index + 1) + '.gif')
                    "
                    alt=""
                  />
                </div>
              </div>
            </div>
            <!-- <div class="state">
              <span class="iconfont icon-redu">&nbsp;449678</span>
              <span class="iconfont icon-aixin">&nbsp;43165</span>
              <span class="iconfont icon-chakan2">&nbsp;492843</span>
            </div> -->
            <div class="btn-box">
              <router-link
                :to="{ name: 'memorialKneel', params: { hallPath: hallInfo.identifier} }"
                class="worship"
                >祭拜</router-link
              >
              <a href="https://abiaoabiao.github.io/TUIPusher/dist/" target="_blank" class="worship">云祭拜</a>
            </div>
          </div>
        </div>
        <div
          class="fixed-header-box"
          :class="{ fixed: isFlxedTab }"
          ref="tabFlxedRef"
        >
          <div class="fixed-header">
            <ul class="tabs">
              <li
                v-for="(item, index) in tabData"
                :key="index"
                @click="
                  isActive = item.path
                  $router.push(item.path)
                "
              >
                <a :class="{ active: isActive === item.path }">{{
                  item.name
                }}</a>
              </li>
            </ul>
            <create-hall></create-hall>
          </div>
        </div>
        <div class="container"><router-view></router-view></div>
      </div>
    </div>
    <layout-footer></layout-footer>
    <!-- 修改头像弹框 -->
    <el-dialog
      title="修改头像"
      :visible.sync="isShowImgPop"
      width="700px"
      center
    >
      <cropper-image
        :initialImg="head"
        :width="128"
        :height="176"
        @finish="finishUpdateHead"
        :deceasedInfo="deceasedInfo"
      ></cropper-image>
    </el-dialog>
  </div>
</template>
<script>
import CropperImage from '@/components/cropper-image'
import { hallInfo } from '@/api/hall'
import { userInfo } from '@/api/user'
import { info } from '@/api/deceased'
import CreateHall from '@/components/create-hall'
import Login from '@/components/login'
import LayoutFooter from '@/components/layout-footer'
import LayoutMenu from '@/components/layout-menu'
export default {
  name: 'MemorialHall',
  components: {
    LayoutFooter,
    LayoutMenu,
    Login,
    CreateHall,
    CropperImage
  },
  props: {
    hallPath: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      tabData: [
        { name: '首页', path: `/memorialHall/${this.hallPath}` },
        {
          name: '追思文章',
          path: `/memorialArticle/${this.hallPath}`
        },
        {
          name: '追忆相册',
          path: `/memorialAlbum/${this.hallPath}`
        },
        {
          name: '祭堂',
          path: `/memorialKneel/${this.hallPath}`
        }
      ],
      isActive: `/memorialHall/${this.hallPath}`,
      isFlxedTab: false,
      hallInfo: {},
      // levelData: ['0px 0px', '-83px 0px', '-166px 0px']
      levelData: [
        { location: '0px 0px', color: '#ff6600' },
        { location: '-83px 0px', color: '#009900' },
        { location: '-166px 0px', color: '#ff0000' }
      ],
      email: '',
      isShowImgPop: false,
      deceasedInfo: {}
    }
  },
  computed: {
    hallId () {
      return parseInt(this.hallPath.slice(1))
    },
    head () {
      return this.deceasedInfo.picture
        ? this.deceasedInfo.picture
        : 'https://xy-sweep.oss-cn-guangzhou.aliyuncs.com/2022-4-4/8ec6fc3a-bc15-4c7d-bd79-2e6c084edf0a.png'
    }
  },
  watch: {},
  created () {
    this.getHallInfo()
    this.isActive = this.$route.path
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      const tabTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      if (tabTop >= 635) {
        this.isFlxedTab = true
      } else {
        this.isFlxedTab = false
      }
    },
    async getUserInfo () {
      const { data: res } = await userInfo(this.hallInfo.createUser)
      console.log(res)
      const lenght = res.user.email.length
      const star = res.user.email.substring(0, 3)
      const end = res.user.email.substring(lenght - 3, lenght)
      this.email = star.concat('***', end)
    },
    async getHallInfo () {
      try {
        const { data: res } = await hallInfo(this.hallId)
        if (res.code !== 0) {
          this.$message.error(res.msg)
        }
        console.log(res)
        if (res.hall.type === 0) {
          res.hall.type = '私人馆'
        } else if (res.hall.type === 1) {
          res.hall.type = '名人馆'
        } else if (res.hall.type === 2) {
          res.hall.type = '恩师馆'
        }
        this.hallInfo = res.hall
        console.log('这里没错')
        this.getUserInfo()
        this.getDeceasedInfo()
      } catch (error) {
        console.log(error)
        this.$message.error('获取数据失败！')
      }
    },
    async getDeceasedInfo () {
      try {
        const { data: res } = await info(this.hallInfo.deceasedId)
        if (res.code !== 0) {
          this.$message.error(res.msg)
        }
        this.deceasedInfo = res.deceased
        console.log(this.deceasedInfo)
      } catch (error) {
        this.$message.error('获取数据失败！')
      }
    },
    finishUpdateHead () {
      this.getDeceasedInfo()
      this.isShowImgPop = false
    },
    handleImgPop () {
      if (
        this.$store.state.user &&
        this.hallInfo.createUser === this.$store.state.user.id
      ) {
        this.isShowImgPop = true
      } else {
      }
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll, true)
  }
}
</script>
<style scoped lang="less">
@tabcolor: #04b194;
.layout-page {
  .memorial-background {
    background: url('~@/assets/images/bigbg2.png') no-repeat;
    background-size: 100% auto;
    width: 100%;
    .memorial-hall {
      width: 1250px;
      margin: 0 auto;
    }
  }
}
.hall-header {
  width: 1200px;
  position: relative;
  img {
    height: 60px;
  }
  /deep/.el-menu.el-menu--horizontal {
    display: inline-block;
    margin-left: 25px;
    .el-menu-item {
      a {
        font-size: 16px;
      }
    }
  }
  .layout-login {
    display: inline-block;
    position: absolute;
    right: 0;
  }
}
.primary-header {
  position: relative;
  margin-top: 76px;
  .head {
    // background-image: url('~@/assets/images/deadHead.png');
    width: 148px;
    height: 193px;
    background-size: 128px 176px;
    margin: 0 auto;
    background-repeat: no-repeat;
    background-position: 12px 9px;
    img {
      width: 148px;
      height: 193px;
    }
  }
  .name {
    margin-top: 30px;
    font-size: 33px;
    line-height: 33px;
    font-weight: bold;
    color: #333;
    text-align: center;
  }
  .desc-box {
    margin-top: 10px;
    text-align: center;
    span {
      font-size: 16px;
      color: #666;
      margin-right: 10px;
      line-height: 16px;
    }
  }
  .level {
    margin-top: 13px;
    text-align: center;
    display: flex;
    justify-content: center;
    .heart {
      margin: 0 35px;
      width: 83px;
      height: 83px;
      background: url('~@/assets/images/level.png') no-repeat top left;
      p {
        padding-top: 22px;
        font-size: 12px;
      }
    }
  }
  // .state {
  //   margin-top: 13px;
  //   text-align: center;
  //   span {
  //     font-size: 14px;
  //     color: #333;
  //     margin-right: 25px;
  //     line-height: 14px;
  //   }
  // }
  .btn-box {
    display: flex;
    text-align: center;
    justify-content: center;
    margin-top: 20px;
    .worship {
      width: 84px;
      height: 40px;
      margin-left: 10px;
      background-color: #ffc107;
      color: #00572e;
      font-size: 19px;
      line-height: 40px;
      text-align: center;
      border-radius: 3px;
    }
    .worship:hover {
      background-color: #fcb84c;
    }
  }
}
.fixed-header-box {
  position: absolute;
  top: 640px;
  left: 0;
  width: 100%;
  .fixed-header {
    position: relative;
    width: 1250px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // background-color: #38c5a6;
    background-color: @tabcolor;

    .tabs {
      li {
        position: relative;
        height: 66px;
        padding: 0 20px;
        margin-right: 10px;
        float: left;
        line-height: 66px;
        a {
          color: #fff;
          font-size: 19px;
        }
        .active::after {
          content: ' ';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background-color: #ffc107;
        }
      }
    }
    /deep/.create-hall {
      margin-right: 25px;
      .createBtn {
        font-size: 19px;
        color: #00572e;
      }
    }
  }
}
.fixed {
  // background-color:#38c5a6;
  background-color: @tabcolor;
  position: fixed;
  left: 0;
  top: 0;
  height: 66px;
  z-index: 1000;
}
.container {
  width: 1250px;
  margin-top: 110px;
  margin-bottom: 50px;
}
</style>
