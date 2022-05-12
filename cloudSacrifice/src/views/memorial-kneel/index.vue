<template>
  <div class="memoria-kneel">
    <div class="header">
      <a>
        <span class="iconfont icon-zhuye"></span>
        <span class="goBack" @click="$router.push(`/memorialHall/${hallPath}`)"
          >返回主页</span
        >
      </a>
    </div>
    <div class="bodyBox">
      <div class="left">
        <div class="onWall">
          <div
            v-for="(item, index) in wallPosition"
            :key="index"
            :style="{ left: item.left, top: item.top }"
          >
            <img :src="wreath[index].img" alt="" v-if="wreath[index]" />
          </div>
        </div>
        <div class="onOtherWall">
          <div
            v-for="(item, index) in otherWallPosition"
            :key="index"
            :style="{
              left: item.left,
              top: item.top,
              transform: item.transform
            }"
          >
            <img :src="wreath[index + 2].img" alt="" v-if="wreath[index + 2]" />
          </div>
        </div>
        <div class="onTable">
          <div
            v-for="(item, index) in tablePosition"
            :key="index"
            :style="{ left: item.left, top: item.top }"
          >
            <img :src="fruits[index].img" alt="" v-if="fruits[index]" />
          </div>
        </div>
        <div class="onFloor">
          <div
            v-for="(item, index) in floorPosition"
            :key="index"
            :style="{ left: item.left, top: item.top }"
          >
            <img :src="flower[index].img" alt="" v-if="flower[index]" />
          </div>
        </div>
        <div class="photo">
          <img :src="deceasedInfo.picture" alt="" :title="deceasedInfo.name" />
        </div>
        <div class="incense">
          <img src="@/assets/images/incense.gif" alt="" />
        </div>
      </div>
      <div class="right">
        <div class="oblation">
          <div class="title">Ta的相思·祭品</div>
          <div class="content">
            <div class="goods">
              <ul>
                <li
                  v-for="(item, index) in orderList"
                  :key="index + Math.random()"
                >
                  <order-item
                    :userId="item.userId"
                    :sacrificeId="item.sacrificeId"
                    :num="item.num"
                    :type="'hall'"
                  ></order-item>
                </li>
              </ul>
            </div>
            <div class="goods-btn">
              <button @click="isShowGoodsPop = true">去供奉祭品</button>
            </div>
          </div>
        </div>
        <send-word :hallId="hallId"></send-word>
      </div>
    </div>
    <!-- 商品弹框 -->
    <el-dialog
      :visible.sync="isShowGoodsPop"
      width="876px"
      top="12vh"
      v-if="isShowGoodsPop"
    >
      <kneel-shop
        :deceasedId="this.hallInfo.deceasedId"
        @finishOrder="finishOrder"
      ></kneel-shop>
    </el-dialog>
  </div>
</template>
<script>
import KneelShop from './components/kneel-shop.vue'
import SendWord from '@/components/send-word'
import { hallInfo } from '@/api/hall'
import { info } from '@/api/deceased'
import { sacrificeInfo } from '@/api/sacrifice'
import { hallOrder } from '@/api/order'
import OrderItem from '@/components/order-item'
export default {
  name: 'MemorialKneel',
  components: {
    KneelShop,
    SendWord,
    OrderItem
  },
  props: {
    hallPath: { type: String, require: true }
  },
  data () {
    return {
      giftData: [
        {
          img: require('@/assets/images/tiantangniao.png'),
          name: '天堂鸟',
          send: '柳雯',
          time: '135天'
        },
        {
          img: require('@/assets/images/tiandixiang.png'),
          name: '天地香',
          send: '陈华英',
          time: '5天'
        },
        {
          img: require('@/assets/images/juzi.png'),
          name: '橘子',
          send: '柳雯',
          time: '135天'
        },

        {
          img: require('@/assets/images/shouzhongdewang.png'),
          name: '寿终德望',
          send: '柳雯',
          time: '135天'
        },
        {
          img: require('@/assets/images/tiantangniao.png'),
          name: '天堂鸟',
          send: '柳雯',
          time: '135天'
        },
        {
          img: require('@/assets/images/tiandixiang.png'),
          name: '天地香',
          send: '陈华英',
          time: '5天'
        },
        {
          img: require('@/assets/images/juzi.png'),
          name: '橘子',
          send: '柳雯',
          time: '135天'
        },
        {
          img: require('@/assets/images/shouzhongdewang.png'),
          name: '寿终德望',
          send: '柳雯',
          time: '135天'
        }
      ],
      isShowGoodsPop: false,
      tablePosition: [
        { left: '398px', top: '409px' },
        { left: '500px', top: '409px' },
        { left: '335px', top: '409px' },
        { left: '560px', top: '409px' },
        { left: '520px', top: '365px' },
        { left: '380px', top: '365px' }
      ],
      floorPosition: [
        { left: '400px', top: '530px' },
        { left: '320px', top: '530px' },
        { left: '480px', top: '530px' },
        { left: '240px', top: '530px' },
        { left: '562px', top: '530px' }
      ],
      wallPosition: [
        { left: '190px', top: '220px' },
        { left: '576px', top: '220px' }
      ],
      otherWallPosition: [
        {
          left: '797px',
          top: '260px',
          transform: 'rotateY(-55deg) rotateX(-7deg)'
        },
        {
          left: '-60px',
          top: '250px',
          transform: 'rotateY(57deg) rotateX(0deg)'
        }
      ],
      hallInfo: {},
      deceasedInfo: {},
      orderList: [],
      orderSacrifice: [],
      num: 0,
      testArray: [{ id: 1 }, { id: 3 }, { id: 1 }, { id: 2 }, { id: 5 }]
    }
  },
  computed: {
    hallId () {
      return parseInt(this.hallPath.slice(1))
    },
    fruits () {
      return this.orderSacrifice
        .filter((element) => {
          return element.type === 0 || element.type === 2
        })
        .reverse()
    },
    flower () {
      return this.orderSacrifice
        .filter((element) => {
          return element.type === 1
        })
        .reverse()
    },
    wreath () {
      return this.orderSacrifice
        .filter((element) => {
          return element.type === 3
        })
        .reverse()
    }
  },
  watch: {},
  created () {
    this.getHallInfo()
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
        this.getDeceasedInfo(res.hall.deceasedId)
        this.hallOrder(res.hall.id)
      } catch (error) {
        this.$message.error('获取纪念馆数据失败！')
      }
    },
    async getDeceasedInfo (deceasedId) {
      try {
        const { data: res } = await info(deceasedId)
        if (res.code !== 0) {
          this.$message.error(res.msg)
        }
        this.deceasedInfo = res.deceased
      } catch (error) {
        console.log(error)
        this.$message.error('获取逝者数据失败！')
      }
    },
    async hallOrder (hallId) {
      try {
        const { data: res } = await hallOrder({ hallId })
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.orderList = res.orderList
        console.log('this.orderList', this.orderList)
        const currentArray = []
        this.orderList.forEach((element, index) => {
          currentArray.push(element.sacrificeId)
        })
        this.getSacrificeArray(currentArray)
      } catch (error) {
        console.log(error)
        this.$message.error('获取订单数据失败！')
      }
    },
    // 提高祭品信息的复用 减少重复向服务器发起请求
    getSacrificeArray (currentArray) {
      currentArray.forEach((element, index) => {
        // 目前实现不了：如果元素 祭品数组中包含 应该也直接复用 不向服务器发起请求
        // 判断祭品数组是否包含该下标的数据
        if (this.orderSacrifice[index]) {
          // 判断祭品数组中指定下标的id 是否 与之相等
          if (this.orderSacrifice[index].id === element) {
            // 相等 直接不改变祭品数组中当前下标的值
          } else {
            // 不相等 将祭品数组中 当前下标的值进行修改
            this.getSacrificeInfo(element, index)
          }
        } else {
          // 祭品数组已经遍历完了 得发起请求获得数据了
          this.getSacrificeInfo(element, index)
        }
      })
      console.log('--->', this.orderSacrifice)
    },
    async getSacrificeInfo (sacrificeId, index) {
      console.log('已经发起了' + (this.num + 1) + '次请求')
      try {
        const { data: res } = await sacrificeInfo(sacrificeId)
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.$set(this.orderSacrifice, index, res.sacrifice)
      } catch (error) {
        this.$message.error('获取用户数据失败！')
      }
    },
    finishOrder () {
      this.isShowGoodsPop = false
      this.hallOrder(this.hallInfo.id)
    }
  }
}
</script>
<style scoped lang="less">
* {
  box-sizing: border-box;
}
.memoria-kneel {
  width: 100vw;
  height: 100vh;
  background: url('~@/assets/images/bigbg3.png') no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  .header {
    width: 1375px;
    margin: 0 auto;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    a {
      cursor: pointer;
      .icon-zhuye {
        font-size: 28px;
        color: #fff;
      }
      .goBack {
        font-size: 16px;
        margin-left: 5px;
        color: #fff;
      }
    }
  }
  .bodyBox {
    width: 1375px;
    height: 647px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    overflow: hidden;
    .left {
      width: 1000px;
      height: 647px;
      background: url('~@/assets/images/hallbg.jpg') no-repeat;
      background-size: contain;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      position: relative;
      .photo {
        position: absolute;
        top: 114px;
        left: 454px;
        img {
          width: 93px;
          height: 112px;
        }
      }
      .incense {
        position: absolute;
        top: 272px;
        left: 452px;
      }
      .onTable {
        div {
          position: absolute;
          width: 90px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .onFloor {
        div {
          position: absolute;
          transform-origin: center center;
          width: 175px;
          transform: rotateX(60deg);
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .onWall {
        div {
          position: absolute;
          width: 235px;
          top: 220px;
          left: 190px;
          transform-origin: center center;
          transform: rotateX(-8deg);
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .onOtherWall {
        div {
          position: absolute;
          width: 255px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .right {
      width: 375px;
      margin-left: 10px;
      height: 100%;
      display: flex;
      flex-direction: column;
      .oblation {
        flex: 1;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.312);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        .title {
          font-size: 18px;
          text-align: left;
          margin-bottom: 18px;
          padding: 18px 20px 0;
          color: #fff;
          overflow: hidden;
        }
        .content {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          .goods {
            flex: 1;
            overflow: hidden;
            padding: 0 20px;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            overflow-y: auto;
            ul {
              width: 100%;
              height: auto;
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
            }
            li {
              width: 49%;
              height: 200px;
              background-color: #fff;
              list-style: none;
              margin-bottom: 6px;
            }
          }
          .goods::-webkit-scrollbar {
            width: 10px;
          }
          .goods::-webkit-scrollbar-thumb {
            background: transparent;
          }
          .goods::-webkit-scrollbar-track {
            border-radius: 10px; /* background: #EDEDED; */
          }
          .goods:hover::-webkit-scrollbar-thumb {
            background: #98d6df;
            border-radius: 10px;
            border: 1px solid #fff;
          }
          .goods-btn {
            height: 70px;
            background-color: rgba(255, 255, 255, 0.215);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 20px;
            button {
              width: 100%;
              height: 44px;
              background-color: #ffc107;
              color: #fff;
              font-size: 18px;
              text-align: center;
              line-height: 44px;
            }
          }
        }
      }
      /deep/.words {
        height: 240px;
        background-color: #99d6de72;
        padding: 16px 20px 20px 20px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        margin-top: 5px;
        border-radius: 5px;
        textarea {
          flex: 1;
          margin-bottom: 10px;
          background-color: transparent;
          border: none;
          outline: none;
          font-size: 17px;
          color: #fff;
          resize: none;
          overflow-y: hidden;
        }
        button {
          font-size: 18px;
          color: #fff;
          height: 44px;
          width: 100%;
          text-align: center;
          line-height: 44px;
          background-color: #b9e7e0;
        }
      }
    }
  }
}

/deep/.el-dialog {
  border-radius: 4px;
  .el-dialog__header {
    padding: 0px;
  }
  .el-dialog__body {
    padding: 0px;
  }
}
</style>
