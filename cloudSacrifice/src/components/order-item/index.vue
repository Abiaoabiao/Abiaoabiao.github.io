<template>
  <div class="hall-order-item" v-if="type === 'hall'">
    <div class="img">
      <img :src="sacrificeData.img" alt="" />
    </div>
    <div class="depict">
      <div class="name">{{ sacrificeData.name }}</div>
      <div class="time">
        <span>{{ userData.nickname }}送</span>
        <span>数量：{{ num }}</span>
      </div>
    </div>
  </div>
  <div class="think-order-item" v-else-if="type === 'think'">
    <div class="img-box">
      <img :src="sacrificeData.img" alt="" />
      <div class="depict">
        <span>{{ userData.nickname }}</span>
        <span class="times">{{ sacrificeData.createTime | relativeTime }}</span>
      </div>
    </div>
    <div class="name">
      {{ sacrificeData.name }}
    </div>
  </div>
  <div v-else class="record-item">
    <div class="left">
      <img :src="userData.head" alt="" />
      <p>
        {{ userData.nickname }}给{{ hallName }}供奉了{{ num
        }}{{ sacrificeData.type | handelType
        }}<span>{{ sacrificeData.name }}</span>
      </p>
    </div>
    <div class="time">{{ sacrificeData.createTime }}</div>
  </div>
</template>
<script>
import { userInfo } from '@/api/user'
import { sacrificeInfo } from '@/api/sacrifice'
export default {
  name: 'OrderItem',
  components: {},
  props: {
    userId: {
      type: Number,
      require: true
    },
    sacrificeId: { type: Number, require: true },
    num: { type: Number },
    type: {
      type: String,
      require: true
    },
    hallName: {
      type: String
    }
  },
  data () {
    return {
      userData: {},
      sacrificeData: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getUserInfo()
    this.getSacrificeInfo()
  },
  mounted () {},
  methods: {
    async getUserInfo () {
      try {
        const { data: res } = await userInfo(this.userId)
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.userData = res.user
      } catch (error) {
        this.$message.error('获取用户数据失败！')
      }
    },
    async getSacrificeInfo () {
      try {
        const { data: res } = await sacrificeInfo(this.sacrificeId)
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.sacrificeData = res.sacrifice
      } catch (error) {
        this.$message.error('获取用户数据失败！')
      }
    }
  },
  filters: {
    handelType (value) {
      if (value === 0 || value === 2) {
        return '盘'
      } else if (value === 1) {
        return '束'
      } else {
        return '个'
      }
    }
  }
}
</script>
<style scoped lang="less">
.hall-order-item {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  overflow: hidden;
  .img {
    flex: 1;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .depict {
    width: 100%;
    height: 50px;
    background-color: #b9e7e0;
    padding: 2px 8px 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    box-sizing: border-box;
    .name {
      width: 100%;
      height: auto;
      text-align: center;
      color: #fff;
      font-size: 16px;
    }
    .time {
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: rgba(255, 255, 255, 0.727);
      font-size: 13px;
    }
  }
}
.think-order-item {
  width: 100%;
  .img-box {
    width: 148px;
    height: 175px;
    position: relative;
    img {
      width: 146px;
      height: 146px;
    }
    .depict {
      position: absolute;
      bottom: 8px;
      width: 100%;
      text-align: center;
      left: 0;
      font-size: 14px;
      color: #333;
      z-index: 10;
      display: flex;
      justify-content: space-between;
      padding: 1px 10px;
      box-sizing: border-box;
      .times {
        color: #999999;
      }
    }
  }
  .name {
    justify-content: space-between;
    line-height: 35px;
    height: 35px;
    background: #dceeea;
    border-radius: 6px;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    color: #04b194;
  }
}
.record-item {
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 6px 12px;
  background: #dceeea;
  margin-bottom: 4px;
  .left {
    display: flex;
    align-content: center;
    img {
      width: 33px;
      height: 33px;
      border-radius: 100%;
      margin-right: 8px;
    }
    p {
      font-size: 16px;
      line-height: 33px;
      color: #333;
      span {
        color: #04b194;
      }
    }
  }
  .time {
    font-size: 14px;
    line-height: 14px;
    color: #999;
  }
}
</style>
