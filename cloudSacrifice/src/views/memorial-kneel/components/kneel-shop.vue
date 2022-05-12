<template>
  <div class="shop">
    <div class="left">
      <div class="tab">
        <div
          :class="{ active: currentTab === index }"
          v-for="(item, index) in shopTab"
          :key="index"
          @click="currentTab = index"
        >
          {{ item }}
        </div>
      </div>
      <div class="content">
        <ul>
          <li
            v-for="item in showSacrificeList"
            :key="item.id"
            @click=";(currentId = item.id), (num = 1)"
          >
            <img :src="item.img" alt="" />
            <div class="model"></div>
            <div class="desc" :class="{ active: currentId === item.id }">
              <span class="name">{{ item.name }}</span>
              <span class="price">{{
                item.price === 0 ? '免费' : '￥' + item.price
              }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="right">
      <div class="detail">
        <div class="display">
          <div class="img">
            <img :src="showGoods[0].img" alt="" />
            <div class="model"></div>
          </div>
          <div class="name">{{ showGoods[0].name }}</div>
        </div>
        <div class="num">
          <span> 数量：</span
          ><el-input-number
            size="small"
            v-model="num"
            :min="1"
            label="描述文字"
          ></el-input-number>
        </div>
        <div class="price">需支付：{{ showGoods[0].price * num }}元</div>
      </div>
      <button class="buy-btn" @click="placeAnOrder">立即供奉</button>
    </div>
  </div>
</template>
<script>
import { list } from '@/api/sacrifice'
import { order } from '@/api/order'
export default {
  name: 'KneelShop',
  components: {},
  props: {
    deceasedId: {
      type: Number,
      require: true
    }
  },
  data () {
    return {
      sacrificeList: [],
      currentId: 1,
      num: 1,
      shopTab: ['全部', '水果', '鲜花', '菜肴', '装饰花圈'],
      currentTab: 0
    }
  },
  computed: {
    showGoods () {
      return this.sacrificeList.filter((item) => item.id === this.currentId)
    },
    showSacrificeList () {
      if (!this.currentTab) {
        return this.sacrificeList
      } else {
        return this.sacrificeList.filter(
          (item) => item.type === this.currentTab - 1
        )
      }
    }
  },
  watch: {},
  created () {
    this.getSacrificeList()
  },
  mounted () {},
  methods: {
    async getSacrificeList () {
      try {
        const { data: res } = await list({ page: 1, limit: 999 })
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.sacrificeList = res.page.list
        console.log(this.sacrificeList)
      } catch (error) {
        this.$message.error('获取祭品失败！')
      }
    },
    async placeAnOrder () {
      try {
        const data = {
          deceasedId: this.deceasedId,
          num: this.num,
          sacrificeId: this.showGoods[0].id
        }
        const { data: res } = await order(data)
        if (res.code !== 0) {
          this.$message.error(res.msg)
        }
        this.$message.success('供奉成功')
        this.$emit('finishOrder')
      } catch (error) {
        console.log(error)
        this.$message.error('生成订单失败')
      }
    }
  }
}
</script>
<style scoped lang="less">
* {
  box-sizing: border-box;
}
.shop {
  width: 876px;
  height: 605px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    width: 630px;
    padding: 10px 10px 0px 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    .tab {
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      div {
        width: auto;
        height: 32px;
        color: #666;
        font-size: 18px;
        text-align: center;
        line-height: 32px;
        cursor: pointer;
        padding: 0 10px;
      }
      .active {
        background-color: #7bd4c1;
        color: #fff;
        border-radius: 3px;
      }
    }
    .content {
      margin-top: 16px;
      flex: 1;
      overflow: hidden;
      overflow-y: auto;
      ul {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        li {
          width: 24%;
          height: 184px;
          background-color: #fff;
          margin-bottom: 6px;
          margin-right: 1%;
          position: relative;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
          }
          .model {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            background: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0),
              rgba(0, 0, 0, 0.2)
            );
          }
          .desc {
            width: 100%;
            height: 40px;
            background-color: rgba(0, 0, 0, 0.2);
            position: absolute;
            left: 0;
            bottom: 0;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 4px 8px;
            color: #fff;
            .name {
              font-size: 14px;
            }
            .price {
              font-size: 12px;
            }
          }
          .active {
            background-color: #7bd4c1;
          }
        }
      }
    }
    .content::-webkit-scrollbar {
      width: 5px;
    }
    .content::-webkit-scrollbar-thumb {
      background: transparent;
    }
    .content::-webkit-scrollbar-track {
      border-radius: 10px; /* background: #EDEDED; */
    }
    .content:hover::-webkit-scrollbar-thumb {
      background: #424242;
      border-radius: 10px;
    }
  }
  .right {
    flex: 1;
    height: 100%;
    padding: 58px 16px 75px 20px;
    background-color: #f8f8f8;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .detail {
      width: 100%;
      height: auto;
      .display {
        width: 142px;
        height: 185px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        .img {
          width: 100%;
          height: 152px;
          background-color: #fff;
          position: relative;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .model {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.1)
          );
        }
        .name {
          width: 100%;
          height: 32px;
          background-color: #fff;
          color: #7bd4c1;
          font-size: 16px;
          text-align: center;
          line-height: 32px;
        }
      }
      .num {
        width: 100%;
        height: auto;
        margin-top: 25px;
        color: #333333;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        overflow: hidden;
      }
      .price {
        width: 100%;
        height: auto;
        margin-top: 16px;
        color: #333333;
        font-size: 16px;
        text-align: left;
      }
    }
    .buy-btn {
      width: 100%;
      height: 44px;
      background-color: #ffc107;
      color: #fff;
      text-align: center;
      line-height: 44px;
      border-radius: 3px;
      cursor: pointer;
    }
  }
}
</style>
