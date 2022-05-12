<template>
  <div class="memorial-home">
    <div class="content">
      <div class="header">
        <span class="title">人物简介</span>
        <span
          class="iconfont icon-xiugai1"
          @click="isEdit = !isEdit"
          v-if="
            this.$store.state.user &&
            this.hallInfo.createUser === this.$store.state.user.id
          "
          ><span>&nbsp;编辑</span></span
        >
      </div>
      <!-- 编辑信息 -->
      <update-deceased-info
        v-if="isEdit"
        v-model="deceasedInfo"
        @changeEdit="isEdit = !isEdit"
      ></update-deceased-info>
      <!-- 展示信息 -->
      <el-descriptions :column="2" v-else>
        <el-descriptions-item label="姓名">{{
          deceasedInfo.name | handelNull
        }}</el-descriptions-item>
        <el-descriptions-item label="性别"
          >{{
            deceasedInfo.gender !== null
              ? deceasedInfo.gender === 1
                ? '男'
                : '女'
              : '暂未填写'
          }}
        </el-descriptions-item>
        <el-descriptions-item label="创建于"
          >{{ deceasedInfo.createTime | dateFormat }}
        </el-descriptions-item>
        <el-descriptions-item label="生辰"
          >{{ deceasedInfo.birthday | dateFormat }}
        </el-descriptions-item>
        <el-descriptions-item label="出生地"
          >{{ deceasedInfo.habitation | handelNull }}
        </el-descriptions-item>
        <el-descriptions-item label="忌日"
          >{{ deceasedInfo.deathday | dateFormat }}
        </el-descriptions-item>
        <el-descriptions-item label="人物简介"
          >{{ deceasedInfo.habitation | handelNull }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="record">
      <div class="header">
        <span class="title">祭拜记录·<span class="green">寄托相思</span></span>
      </div>
      <div class="content">
        <div class="worship">
          <order-item
            v-for="(item, index) in orderList"
            :key="index + Math.random()"
            :userId="item.userId"
            :sacrificeId="item.sacrificeId"
            :num="item.num"
            :type="'record'"
            :hallName='hallInfo.title'
          ></order-item>
        </div>
        <div class="word">
          <div class="show-word">
            <article-item
              class="article-item"
              :hallId="hallId"
              v-model="isUpdate"
              :type="0"
            ></article-item>
          </div>
          <send-word
            :hallId="hallId"
            @changeUpdate="isUpdate = true"
          ></send-word>
        </div>
      </div>
    </div>
    <div class="think">
      <div class="header">
        <span class="title">追思物品·<span class="green">寄托相思</span></span>
      </div>
      <div v-if="orderList.length === 0">
        <empty></empty>
      </div>
      <ul v-else>
        <li v-for="(item, index) in orderList" :key="index + Math.random()">
          <order-item
            :userId="item.userId"
            :sacrificeId="item.sacrificeId"
            :type="'think'"
          ></order-item>
        </li>
      </ul>
    </div>
    <div class="article">
      <div class="header">
        <span class="title"
          >追思文章·<span class="green">超越时空的情感</span></span
        >
        <span class="green">更多</span>
      </div>
      <article-item
        class="article-item"
        :hallId="hallId"
        :isShow4="true"
        :type="1"
      ></article-item>
    </div>
    <div class="photo">
      <div class="header">
        <span class="title">回忆相册·<span class="green">音容永存</span></span>
      </div>
      <el-empty></el-empty>
    </div>
  </div>
</template>
<script>
import { hallInfo } from '@/api/hall'
import { info } from '@/api/deceased'
import UpdateDeceasedInfo from './components/update-deceased-info.vue'
import ArticleItem from '@/components/article-item'
import SendWord from '@/components/send-word'
import Empty from '@/components/empty'
import { hallOrder } from '@/api/order'
import OrderItem from '@/components/order-item'
export default {
  name: 'MemorialHome',
  components: {
    UpdateDeceasedInfo,
    ArticleItem,
    SendWord,
    Empty,
    OrderItem
  },
  props: {
    hallPath: { type: String, require: true }
  },
  data () {
    return {
      deceasedInfo: {},
      hallInfo: {},
      isEdit: false,
      isUpdate: false,
      orderList: []
    }
  },
  computed: {
    hallId () {
      return parseInt(this.hallPath.slice(1))
    }
  },
  watch: {},
  created () {
    this.getHallInfo()
    this.hallOrder()
  },
  mounted () {},
  methods: {
    async getHallInfo () {
      try {
        const { data: res } = await hallInfo(this.hallId)
        if (res.code !== 0) {
          this.$message.error(res.msg)
        }
        this.hallInfo = res.hall
        this.getDeceasedInfo()
      } catch (error) {
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
    async hallOrder () {
      try {
        const { data: res } = await hallOrder({ hallId: this.hallId })
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.orderList = res.orderList.reverse().slice(0, 8)
        console.log('this.orderList', this.orderList)
      } catch (error) {
        console.log(error)
        this.$message.error('获取订单数据失败！')
      }
    }
  }
}
</script>
<style scoped lang="less">
@maincolor: #3fc2a6;
.memorial-home {
  > div {
    padding: 20px 20px 0 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin-top: 20px;
  }
  > div:first-child {
    margin-top: 0;
  }
  .record {
    padding: 20px !important;
    .content {
      display: flex;
      justify-content: space-between;
      .worship {
        width: 596px;
        height: 240px;
        overflow: hidden;
      }
      .word {
        flex: 1;
        margin-left: 16px;
        display: flex;
        flex-direction: column;
        .show-word {
          width: 596px;
          height: 94px;
        }
        /deep/.words {
          position: relative;
          textarea {
            margin-top: 16px;
            width: 596px !important;
            height: 131px !important;
            background: #ffffff;
            border: 4px solid #f1f8f7;
            box-sizing: border-box;
            padding: 10px 12px;
            resize: none;
          }
          button {
            position: absolute;
            bottom: 20px;
            right: 15px;
            width: 128px;
            height: 33px;
            background: #04b194;
            border-radius: 3px;
            line-height: 33px;
            text-align: center;
            font-size: 14px;
            color: #fff;
          }
        }
      }
    }
  }
}
.header {
  display: flex;
  justify-content: space-between;
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
  .icon-xiugai1 {
    cursor: pointer;
    font-size: 17px;
    color: @maincolor;
    span {
      font-size: 14px;
      line-height: 17px;
      padding-left: 4px;
    }
  }
}
.article-item {
  /deep/ul {
    justify-content: space-between;
  }
  /deep/li {
    width: 49.4%;
  }
}
.content {
  /deep/.el-descriptions {
    padding-left: 33px;
    .el-descriptions-item {
      padding-bottom: 20px;
      .el-descriptions-item__container {
        font-size: 16px;
        color: #333;
      }
    }
  }
}
.think {
  padding: 20px !important;
  ul {
    width: 100%;
    font-size: 0;
    height: 210px;
    li {
      display: inline-block;
      width: 140px;
      margin-right: 12px;
      &:last-child {
        margin-right: 0px;
      }
    }
  }
}
</style>
