<template>
  <div class="cropper-content">
    <div class="cropper-box">
      <div class="cropper">
        <vue-cropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.outputSize"
          :outputType="option.outputType"
          :info="option.info"
          :canScale="option.canScale"
          :autoCrop="option.autoCrop"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :fixed="option.fixed"
          :fixedNumber="option.fixedNumber"
          :full="option.full"
          :fixedBox="option.fixedBox"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :original="option.original"
          :centerBox="option.centerBox"
          :height="option.height"
          :infoTrue="option.infoTrue"
          :maxImgSize="option.maxImgSize"
          :enlarge="option.enlarge"
          :mode="option.mode"
          @realTime="realTime"
          @imgLoad="imgLoad"
        >
        </vue-cropper>
      </div>
      <div class="show-preview">
        <div :style="previews.div" class="preview">
          <img :src="previews.url" :style="previews.img" />
        </div>
      </div>
    </div>
    <div class="handle-cropper">
      <div class="scope-btn">
        <label class="btn" for="uploads">选择头像</label>
        <input
          type="file"
          id="uploads"
          style="position: absolute; clip: rect(0 0 0 0)"
          accept="image/png, image/jpeg, image/gif, image/jpg"
          @change="selectImg($event)"
        />
        <el-button
          size="mini"
          type="danger"
          plain
          icon="el-icon-zoom-in"
          @click="changeScale(1)"
          >放大</el-button
        >
        <el-button
          size="mini"
          type="danger"
          plain
          icon="el-icon-zoom-out"
          @click="changeScale(-1)"
          >缩小</el-button
        >
        <el-button size="mini" type="danger" plain @click="rotateLeft"
          >↺ 左旋转</el-button
        >
        <el-button size="mini" type="danger" plain @click="rotateRight"
          >↻ 右旋转</el-button
        >
      </div>
      <div class="upload-btn">
        <el-button size="mini" type="success" @click="onConfirm('blob')"
          >上传头像 <i class="el-icon-upload"></i
        ></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { update } from '@/api/deceased.js'
import { VueCropper } from 'vue-cropper'
import { uploadImg } from '@/api/img'
import { updateUser } from '@/api/user'
import _ from 'lodash'
export default {
  name: 'CropperImage',
  components: {
    VueCropper
  },
  props: {
    initialImg: {
      type: String,
      require: true
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 200
    },
    deceasedInfo: {
      type: Object
    }
  },
  data () {
    return {
      previews: {},
      option: {
        img: this.initialImg, // 裁剪图片的地址
        outputSize: 1, // 裁剪生成图片的质量(可选0.1 - 1)
        outputType: 'png', // 裁剪生成图片的格式（jpeg || png || webp）
        info: true, // 图片大小信息
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: this.width, // 默认生成截图框宽度
        autoCropHeight: this.height, // 默认生成截图框高度
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [this.width, this.height], // 截图框的宽高比例
        full: false, // false按原比例裁切图片，不失真
        fixedBox: true, // 固定截图框大小，不允许改变
        canMove: false, // 上传图片是否可以移动
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        height: true, // 是否按照设备的dpr 输出等比例图片
        infoTrue: false, // true为展示真实输出图片宽高，false展示看到的截图框宽高
        maxImgSize: 3000, // 限制图片最大宽度和高度
        enlarge: 1 // 图片根据截图框输出比例倍数
      }
    }
  },
  methods: {
    // 初始化函数
    imgLoad (msg) {
      console.log('工具初始化函数=====' + msg)
    },
    // 图片缩放
    changeScale (num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    // 向左旋转
    rotateLeft () {
      this.$refs.cropper.rotateLeft()
    },
    // 向右旋转
    rotateRight () {
      this.$refs.cropper.rotateRight()
    },
    // 实时预览函数
    realTime (data) {
      this.previews = data
    },
    // 选择图片
    selectImg (e) {
      const file = e.target.files[0]
      if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)) {
        this.$message({
          message: '图片类型要求：jpeg、jpg、png',
          type: 'error'
        })
        return false
      }
      // 转化为blob
      const reader = new FileReader()
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        this.option.img = data
        console.log(data)
      }
      // 转化为base64
      reader.readAsDataURL(file)
    },
    // 上传图片
    onConfirm (type) {
      if (type === 'blob') {
        // 获取截图的blob数据
        this.$refs.cropper.getCropBlob((blob) => {
          this.updatePhoto(blob)
        })
      }
    },
    async updatePhoto (blob) {
      try {
        const formData = new FormData()
        formData.append('file', blob, '.jpg')
        const { data: res } = await uploadImg(formData)
        if (this.width === 200) {
          this.updateHead(res.filePath)
        } else {
          console.log('我进来了')
          this.updateDeadHead(res.filePath)
        }
        this.$emit('close')
      } catch (error) {
        console.log(error)
        this.$message.error('修改头像失败！')
      }
    },
    async updateHead (filePath) {
      try {
        const info = { head: filePath }
        const { data: result } = await updateUser(info)
        console.log(result)
        if (result.code !== 0) {
          this.$message.error(result.msg)
        }
        const user = _.cloneDeep(this.$store.state.user)
        user.head = filePath
        this.$store.commit('setUser', user)
        this.$message.success('修改头像成功！')
      } catch (error) {}
    },
    async updateDeadHead (filePath) {
      try {
        const info = _.cloneDeep(this.deceasedInfo)
        info.picture = filePath
        const { data: res } = await update(info)
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        console.log(res)
        this.$message({ message: '修改成功', type: 'success' })
        this.$emit('finish')
      } catch (error) {}
    }
  }
}
</script>

<style scoped lang="less">
.cropper-content {
  display: flex;
  flex-direction: column;
  .cropper-box {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .cropper {
      width: 400px;
      height: 300px;
    }
    .show-preview {
      width: 250px;
      display: flex;
      justify-content: center;
      .preview {
        overflow: hidden;
        border: 1px solid #ccc;
        background: #fff;
        box-sizing: border-box;
      }
    }
  }
  .handle-cropper {
    margin-top: 30px;
    display: flex;
    .scope-btn {
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      padding-right: 10px;
    }
    .upload-btn {
      flex: 1;
      -webkit-flex: 1;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
    }
    .btn {
      outline: none;
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      -webkit-appearance: none;
      text-align: center;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      outline: 0;
      -webkit-transition: 0.1s;
      transition: 0.1s;
      font-weight: 500;
      padding: 8px 15px;
      font-size: 12px;
      border-radius: 3px;
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
      margin-right: 10px;
    }
  }
}
</style>
