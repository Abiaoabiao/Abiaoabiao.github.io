<template>
  <footer class="footer">
    <div class="content">
      <div class="about">
        <h4>关于</h4>
        <p>
          祭祀文化网致力于解决祭拜缅怀的忆祖需求、传统文化的传承需求、绿色殡葬的改革需求、行业规范的引导需求，提供：网上纪念馆、在线选墓、祖先档案、网上祭祀、清明祭祀、代理祭祀、殡葬知识普及等多项服务，紧跟新时代步伐，开辟出文化与科技兼取，习俗与生态并重，线上和线下联动的时代创新模式，将文化事业与文化产业完美结合，用务实笃行，把中国传统文化与生命文化向着生态创新的方向不断推进。
        </p>
        <p>
          网上纪念馆，亲者可以在手机或电脑上，营造出接近真实的订制化的祭祀场景，同时上传生成逝者的图片视频，发表悼念、吊唁的文章。让亲者打破时间和空间的束缚，随时随地，在网上或现实中，规范礼仪传承的指导下，更好的完成忆祖的殡葬祭诸多礼仪。慎终追远民德归厚。
        </p>
      </div>
      <div class="server">
        <h4>产品与服务</h4>
        <ul>
          <li>网上纪念馆</li>
        </ul>
        <img :src="src" class='qrcode' alt="微信公众号" title="微信公众号">
      </div>
      <div class="other">
        <h4>其他</h4>
        <ul>
          <li>意见反馈</li>
          <li>用户协议</li>
          <li>隐私政策</li>
          <li>证照中心</li>
          <li>联系我们</li>
        </ul>
      </div>
    </div>
    <div class="copyright">
      <a href="http://beian.miit.gov.cn/" target="_blank">
        2019 - 2021-www.jisiwenhua.com祭祀文化网版权所有-辽ICP备16006285号-6</a
      >
    </div>
  </footer>
</template>
<script>
export default {
  name: 'LayoutFooter',
  components: {},
  props: {},
  data () {
    return {
      src: require('@/assets/images/wxQRcode.jpg')
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style scoped lang="less">
.footer {
  align-self: flex-end;
  width: 100%;
  padding-top: 45px;
  border-top: 1px solid #d6d6d6;
  height: auto;
  .content {
    max-width: 1200px;
    margin: 0 auto !important;
    display: flex;
    justify-content: space-between;
    .about,
    .serve,
    .other {
      padding: 0 10px;
    }
    .about {
      width: 880px;
    }
    .serve {
      width: 180px;
    }
    .other {
      width: 80px;
    }
    h4 {
      font-size: 16px;
      margin-bottom: 25px;
      color: #000;
      font-weight: 700;
    }
    p {
      text-align: justify;
      font-size: 14px;
    }
    li {
      margin-bottom: 13px;
    }
    .other {
      position: relative;
      h4::before {
        content: url(~@/assets/images/decorate.png);
        position: absolute;
        top: 5px;
      }
    }
  }
  .copyright {
    margin-top: 5px;
    background-color: #666666;
    text-align: center;
    height: 40px;
    a {
      line-height: 40px;
      color: #fff;
    }
  }
}
.qrcode {
  width:120px;
  margin-left: -15px;
}
</style>
